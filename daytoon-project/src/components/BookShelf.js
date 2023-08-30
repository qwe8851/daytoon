import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <td>{book.no}</td>
            <td>{book.row}</td>
            <td>{book.column}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.volumes}</td>
            <td>{book.completed ? '완결' : ''}</td>
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

    const genreRef = useRef(0);
    const titleRef = useRef(null);

    useEffect(() => {
        const isLogin = sessionStorage.getItem('user');
        if (!isLogin) {
            navigate('/admin/signin');
            return;
        }

        // TODD: router에서 렌더링 전에 함수 호출하는 방식으로 바꾸기
        const fetchHandler = async () => {
            setCurrentStatus('데이터를 불러오는 중입니다');

            const response = await fetch('http://localhost:5000/main');
            const result = await response.json();

            if (result.success) {
                const loadedBooks = Object.keys(result.data).map((key, index) => {
                    const book = result.data[key];
                    const genreNumber = parseInt(book.genre);
                    const genreValue = genresData.find(data => data.number === genreNumber)?.value || '';
                    
                    return {
                        id: book._id,
                        no: index + 1,
                        title: book.title,
                        author: book.author,
                        volumes: book.volumes,
                        completed: book.completed,
                        genre: genreValue,
                        update: book.update,
                        menu: book.menu,
                        row: book.row,
                        column: book.column,
                        note1: book.note1,
                        note2: book.note2,
                        description: book.description,
                    };
                });
                setBooks(loadedBooks);
                setFilteredBooks(loadedBooks);
            } 

            setCurrentStatus('데이터가 존재하지 않습니다.');
        }
        
        fetchHandler().catch((error) => {
            setCurrentStatus('데이터를 불러오는데 실패하였습니다. 다시 시도 해주세요.');
            console.log(error);
        });

    }, [navigate]);

    // 장르 검색
    const genreSearchHandler = () => {
        const searchGenre = genreRef.current.value;

        if (searchGenre === '장르(전체)'){
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

        const searchTitle = titleRef.current.value.trim();

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
                        ref={titleRef} 
                        onChange={resetSearchFilterHandler}
                        onKeyDown={(e) => e.key === 'Enter' && searchHandler()} 
                        placeholder='도서명을 입력해주새요' 
                    />
                    <button type='button' onClick={searchHandler}>검색</button>
                </S.SearchBar>
                <S.OptionBar>
                    <button type='button' className='delete' onClick={multipleDeleteHandler} >선택삭제</button>
                    <button type='button' onClick={() => navigate('/admin/detail')} className='add'>추가</button>
                    <button type='button' className='upload' onClick={() => alert("준비중")}>Excel</button>
                </S.OptionBar>
            </L.Article>
            <L.Article>
                <L.Table>
                    <thead>
                        <tr>
                            <L.Th></L.Th>
                            <L.Th>No.</L.Th>
                            <L.Th>책장</L.Th>
                            <L.Th>칸</L.Th>
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