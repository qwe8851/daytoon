import React, { useEffect, useRef, useState } from 'react';

import genresData from '../assets/json/genreData.json';

import * as S from '../styles/components.styled';
import * as L from '../styles/layout.styled';

const Search = () => {
    const titleRef = useRef();
    const genreRef = useRef();

    const [books, setBooks] = useState([]); //fetch데이터
    const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 데이터
    const [currentStatus, setCurrentStatus] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            setCurrentStatus('데이터를 불러오는 중입니다');
            titleRef.current.focus();

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
                        menu: book.menu,
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

            setCurrentStatus('검색 결과가 없습니다.');
        }

        fetchData().catch((error)=>{
            setCurrentStatus('데이터를 불러오는데 실패하였습니다. 다시 시도 해주세요.');
            console.log(`error: ${error}`);
        })
    }, []);

    const replaceHandler = (value) => {
        if (!value) return '';

        return value.replace(/(\s*)/g, "").toLowerCase();
    }

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

    const submitHandler = (e) => {
        e.preventDefault();

        resetSearchFilterHandler();

        const searchData = replaceHandler(titleRef.current?.value);

        if (!searchData) return setFilteredBooks(books);

        const filteredBooks = books.filter((book) => {
            const bookTitle = replaceHandler(book.title);
            const bookAuthor = replaceHandler(book.author);
            const bookGenre = book.genre; 
            const bookNote1 = replaceHandler(book.note1);
            const bookNote2 = replaceHandler(book.note2);

            // 검색어와 도서 제목, 저자, 장르, 노트1, 노트2를 모두 비교
            const isMatched = (
                bookTitle.includes(searchData)
                || bookAuthor.includes(searchData)
                || bookGenre.includes(searchData)
                || bookNote1.includes(searchData)
                || bookNote2.includes(searchData)
            );

            return isMatched;
        });

        setFilteredBooks(filteredBooks);
    }

    return (
        <>
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
                        onChange={submitHandler}
                        onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                        placeholder='검색할 도서의 정보를 입력해주세요'
                    />
                    <button type='button' onClick={searchHandler}>검색</button>
                </S.SearchBar>
            </L.Article>
            <L.Article>
                <L.Table>
                    <thead>
                        <tr>
                            <L.Th width='5rem'>책장/칸</L.Th>
                            <L.Th width='35%'>도서명</L.Th>
                            <L.Th>저자</L.Th>
                            <L.Th width='5rem'>최종권수</L.Th>
                            <L.Th width='5rem'>완결여부</L.Th>
                            <L.Th>장르</L.Th>
                            <L.Th width='8rem'>업데이트 일자</L.Th >
                            <L.Th>비고1</L.Th>
                            <L.Th>비고2</L.Th>
                        </tr>
                    </thead>
                    <tbody>
                        { filteredBooks.length > 0 
                            ? filteredBooks.map((data, idx) => (
                                <tr key={idx}>
                                    <td>{data.row}-{data.column}</td>
                                    <td>{data.title}</td>
                                    <td>{data.author}</td>
                                    <td>{data.volumes}</td>
                                    <td>{data.completed && '완결'}</td>
                                    <td>{data.genre}</td>
                                    <td>{data.update}</td>
                                    <td>{data.note1}</td>
                                    <td>{data.note2}</td>
                                </tr>
                            )) : <tr style={{ height: '3rem' }} >
                                <td colSpan='13'>{currentStatus}</td>
                            </tr>
                        }
                    </tbody>
                </L.Table>
            </L.Article>
        </>
    );
}

export default Search;