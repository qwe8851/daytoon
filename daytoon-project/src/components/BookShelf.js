import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

import genresData from '../assets/json/genreData.json';

import * as S from '../styles/components.styled';
import * as L from '../styles/layout.styled';

// TODO: 메인페이지(Search)랑 중복되는 코드 수정 필요 

const BookRow = React.memo(({ book, selectedIds, handleCheckboxChange, navigate }) => {
    return (
        <tr onClick={() => navigate(`/admin/detail/${book.id}`)}>
            <td onClick={(e) => handleCheckboxChange(e, book.id)}>
                <input type="checkbox" checked={selectedIds.includes(book.id)} onChange={() => { }} />
            </td>
            <td>{book.row}</td>
            <td>{book.column}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.volumes}</td>
            <td>{book.completed && '완결'}</td>
            <td>{book.genre}</td>
            <td>{book.update}</td>
            <td>{book.note1}</td>
            <td>{book.note2}</td>
        </tr>
    );
});

const BookShelf = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]); //fetch데이터
    const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 데이터
    const [selectedIds, setSelectedIds] = useState([]); // 선택삭제 시 bookids체크
    const [currentStatus, setCurrentStatus] = useState(); // 선택삭제 시 bookids체크
    const [showExcelOption, setShowExcelOption] = useState(false);

    const genreRef = useRef(0);
    const searchRef = useRef(null);

    useEffect(() => {
        const isLogin = sessionStorage.getItem('user');
        if (!isLogin) {
            navigate('/admin/signin');
            return;
        }

        // TODD: router에서 렌더링 전에 함수 호출하는 방식으로 바꾸기
        const fetchHandler = async () => {
            setCurrentStatus('데이터를 불러오는 중입니다');

            try {
                const response = await fetch('http://localhost:5000/main');
                const result = await response.json();

                if (result.success) {
                    const loadedBooks = Object.keys(result.data).map((key, index) => {
                        const book = result.data[key];
                        const genreNumber = parseInt(book.genre);
                        const genreValue = genresData.find(data => data.number === genreNumber)?.value || '';

                        return {
                            id: book._id,
                            title: book.title,
                            author: book.author,
                            volumes: book.volumes,
                            completed: book.completed,
                            genre: genreValue,
                            update: book.update,
                            row: book.row,
                            column: book.column,
                            note1: book.note1,
                            note2: book.note2,
                            description: book.description,
                        };
                    });

                    // 내림차순으로 정렬
                    const sortedBooks = [...loadedBooks].sort((a, b) => {
                        if (a.row !== b.row) {
                            return b.row - a.row;
                        } else {
                            return b.column - a.column;
                        }
                    });

                    setBooks(sortedBooks);
                    setFilteredBooks(sortedBooks);
                }
                setCurrentStatus('데이터가 존재하지 않습니다.');
            } catch (error) {
                setCurrentStatus('데이터를 불러오는데 실패하였습니다. 다시 시도 해주세요.');
                console.log(error);
            }
        };
        
        fetchHandler();
        // setFetchData(false); // fetchData 상태를 다시 false로 설정하여 다음번에 useEffect가 실행될 때 데이터를 불러올 수 있게 함
    }, [navigate]);

    // 장르 검색
    const genreSearchHandler = () => {
        const searchGenre = genreRef.current.value;

        if (searchGenre === '장르(전체)') {
            setFilteredBooks(books);
            return;
        }

        const updateFilteredBooks = books.filter(book => book.genre === searchGenre);
        setFilteredBooks(updateFilteredBooks);

        if (updateFilteredBooks.length < -1) {
            setCurrentStatus('선택한 장르에 해당하는 데이터가 없습니다.');
        }
    }

    // 장르 + 도서명 검색
    const searchHandler = () => {
        genreSearchHandler();

        const searchTitle = searchRef.current.value.trim();

        if (searchTitle.length < 0) {
            resetSearchFilterHandler();
            return;
        }

        const updateFilteredBooks = filteredBooks.filter(book => book.title.includes(searchTitle));
        setFilteredBooks(updateFilteredBooks);

        if (updateFilteredBooks.length < -1) {
            setCurrentStatus('검색하신 데이터에 해당하는 데이터가 없습니다.');
        }
    }

    // filteredBooks state 장르 검색 데이터로 초기화
    const resetSearchFilterHandler = () => {
        setFilteredBooks(books);
        genreSearchHandler();
    }

    const handleCheckboxChange = (e, id) => {
        e.stopPropagation();

        setSelectedIds(prevIds => {
            const updatedIds = new Set(prevIds);

            if (updatedIds.has(id)) {
                updatedIds.delete(id);
            } else {
                updatedIds.add(id);
            }

            return Array.from(updatedIds);
        });
    };

    const multipleDeleteHandler = async () => {
        if (selectedIds.length < 1) return alert("선택된 항목이 없습니다.");

        if (!window.confirm("선택된 항목들을 정말 삭제하시겠습니까?")) return;

        try {
            const response = await fetch('http://localhost:5000/main/multiple-bookids', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "bookIds": selectedIds
                }),
            });

            const result = await response.json();

            if (result.success) {
                // 선택된 항목 제거
                const updatedBooks = books.filter(book => !selectedIds.includes(book.id));
                setFilteredBooks(updatedBooks);
                setBooks(updatedBooks);

                return alert('선택된 항목들을 삭제되었습니다.');
            } else {
                throw new Error();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const downloadExcelHandler = async () => {
        try {
            const response = await fetch('http://localhost:5000/main/download-excel', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    books: books
                }),
                responseType: 'blob', // Blob 형식으로 응답 받음
            });

            const date = new Date();
            const formattedDate = format(date, 'yyMMddHHmm');

            // Blob 데이터를 파일로 다운로드
            const blobData = await response.blob();
            const url = window.URL.createObjectURL(blobData);
            const a = document.createElement('a');
            a.href = url;
            a.download = `daytoon_booklist_${formattedDate}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.log(error);
            alert('Excel 파일 다운로드 중 오류가 발생했습니다.');
        }
    };

    const uploadFetchHandler = useCallback(async (e) => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // 첫 번째 시트 가져오기
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                // 셀 데이터를 파싱
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const formatData = [];
                jsonData.forEach((data, idx) => {
                    if (idx === 0) return;
                    if (!(data[0] && data[1] && data[2] && data[3] && data[6]) ) return;

                    // find를 사용하여 해당 값을 바로 숫자로 변환 → 추가적인 형변환 필요 X
                    const genreNumber = genresData.find(item => item.value === data[6])?.number || 0;

                    const date = new Date();
                    const formattedDate = format(date, 'yyyy-MM-dd');

                    formatData.push({
                        "row": data[0],
                        "column": data[1],
                        "title": data[2],
                        "author": data[3],
                        "volumes": data[4],
                        "completed": data[5] ? true : false,
                        "genre": genreNumber,
                        "update": formattedDate,
                        "note1": data[8],
                        "note2": data[9],
                        "description": data[10],
                    });
                });

                // 파싱한 데이터를 서버로 보내기
                const response = await fetch('http://localhost:5000/main/upload-excel', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formatData),
                });

                const result = await response.json();

                if (result.success) {
                    alert('Excel 파일 업로드 성공');
                    window.location.reload();
                } else {
                    console.log("result : ", result);
                    throw new Error();
                }
            };

            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.log(error);
            alert('Excel 파일 업로드 중 오류 발생');
        }
    }, []);

    const uploadExcelHandler = useCallback(() => {
        if (!window.confirm("업로드 시 저장된 데이터가 삭제되고 업로드 된 데이터로 대체됩니다! \n\n데이터가 유실될 가능성이 있으므로 \n업로드 전 \"Excel 다운로드\"를 진행해주세요")) return;

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', uploadFetchHandler);

        document.body.appendChild(fileInput);
        fileInput.click();

        fileInput.remove();
    }, [uploadFetchHandler]);

    const logoutHandler = () => {
        sessionStorage.removeItem('user');
        alert("로그아웃되었습니다. \n메인 페이지로 이동합니다");
        navigate("/");
    }

    return (
        <S.Card $width="40" $direction="column">
            <L.Article>
                <S.SearchBar>
                    <select id="genre" ref={genreRef} onChange={genreSearchHandler}>
                        {genresData.map((genre) => (
                            <option key={genre.number} value={genre.value}>{genre.value}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        ref={searchRef}
                        onChange={resetSearchFilterHandler}
                        onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                        placeholder='도서명을 입력해주새요'
                    />
                    <button type='button' onClick={searchHandler}>검색</button>
                </S.SearchBar>
                <S.OptionBar>
                    <button type='button' className='delete' onClick={multipleDeleteHandler} >선택삭제</button>
                    <button type='button' onClick={() => navigate('/admin/detail')} className='add'>추가</button>
                    <button type='button' onClick={() => setShowExcelOption(prev => !prev)}>Excel</button>
                    <button type='button' className='logout' onClick={logoutHandler}>Logout</button>
                </S.OptionBar>
                {showExcelOption && <div className='excelOptionBar'>
                    <S.OptionBar>
                        <button type='button' className='download' onClick={downloadExcelHandler}>Excel 다운로드</button>
                        <button type='button' className='upload' onClick={uploadExcelHandler}>Excel 업로드</button>
                        <p><span className='essential'>*</span> 업로드 전 "Excel 다운로드"를 먼저 진행해주세요!</p>
                    </S.OptionBar>
                </div>}
            </L.Article>
            <L.Article>
                <L.Table>
                    <thead>
                        <tr>
                            <L.Th width='2rem'></L.Th>
                            <L.Th width='3rem'>책장</L.Th>
                            <L.Th width='3rem'>칸</L.Th>
                            <L.Th width='35%'>도서명</L.Th>
                            <L.Th>저자</L.Th>
                            <L.Th width='5rem'>최종권수</L.Th>
                            <L.Th width='5rem'>완결여부</L.Th>
                            <L.Th>장르</L.Th>
                            <L.Th width='8rem'>업데이트 일자</L.Th>
                            <L.Th>비고1</L.Th>
                            <L.Th>비고2</L.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0
                            ? filteredBooks.map((book) => (
                                <BookRow
                                    key={book.id}
                                    book={book}
                                    selectedIds={selectedIds}
                                    handleCheckboxChange={handleCheckboxChange}
                                    navigate={navigate}
                                />
                            ))
                            : <tr style={{ height: '3rem' }} >
                                <td colSpan='13'>{currentStatus}</td>
                            </tr>
                        }
                    </tbody>
                </L.Table>
            </L.Article>
        </S.Card>
    );
}

export default BookShelf;