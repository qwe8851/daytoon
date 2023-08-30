import React, { useEffect, useRef, useState } from 'react';

import genresData from '../assets/json/genreData.json';

import * as S from '../styles/search.styled';
import * as L from '../styles/layout.styled';

const Search = () => {
    const inputRef = useRef();

    const [books, setBooks] = useState([]); //fetch데이터
    const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 데이터

    const [currentStatus, setCurrentStatus] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
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

            setCurrentStatus('검색 결과가 없습니다.');
        }

        fetchData().catch((error)=>{
            setCurrentStatus('데이터를 불러오는데 실패하였습니다. 다시 시도 해주세요.');
            console.log(`error: ${error}`);
        })
    }, []);

    const replaceHandler = (value) => {
        return value.replace(/(\s*)/g, "").toLowerCase();
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const searchData = replaceHandler(inputRef.current.value);

        if (!searchData) return setFilteredBooks(books);

        const filteredBooks = books.filter((book) => {
            const bookTitle = replaceHandler(book.title);
            const bookAuthor = replaceHandler(book.author);
            const bookGenre = replaceHandler(book.genre);
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
            <S.Search>
                <input type="text" ref={inputRef} onChange={submitHandler} />
                <button type='submit'>검색</button>
            </S.Search>
            {
                filteredBooks.length > 0 ? (
                    <L.Table>
                        <thead>
                            <tr>
                                <L.Th width='4rem'>책장/칸</L.Th>
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
                            {filteredBooks.map((data, idx) => (
                                <tr key={idx}>
                                    <td>{data.row}-{data.column}</td>
                                    <td>{data.title}</td>
                                    <td>{data.author}</td>
                                    <td>{data.volumes}</td>
                                    <td>{data.complete && "완결"}</td>
                                    <td>{data.genre}</td>
                                    <td>{data.update}</td>
                                    <td>{data.note1}</td>
                                    <td>{data.note2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </L.Table>
                ) : (
                    <p>{currentStatus}</p>
                )
            }
        </>
    );
}

export default Search;