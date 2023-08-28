import React, { useRef, useState } from 'react';

import * as S from '../styles/search.styled';

const DEMO = [
    {
        "number": "1",
        "title": "요츠바랑",
        "author": "저자임",
        "volumes": "",
        "complete": false,
        "genre": "",
        "update": "2023-03-12",
        "row": 20,
        "column": 2,
        "note1": "",
        "note2": "",
    }, {
        "number": "2",
        "title": "바닷마을 다이어리",
        "author": "저자1",
        "volumes": "",
        "complete": false,
        "genre": "",
        "update": "2023-03-08",
        "row": 32,
        "column": 5,
        "note1": "",
        "note2": "",
    }, {
        "number": "",
        "title": "플라워 오브 라이프",
        "author": "저자2",
        "volumes": "",
        "complete": false,
        "genre": "",
        "update": "2021-04-12",
        "row": 14,
        "column": 2,
        "note1": "",
        "note2": "",
    }, {
        "number": "",
        "title": "너에게 닿기를",
        "author": "저자333",
        "volumes": "",
        "complete": true,
        "genre": "",
        "update": "2020-12-12",
        "row": 5,
        "column": 1,
        "note1": "",
        "note2": ""
    }, {
        "number": "",
        "title": "체인소맨",
        "author": "",
        "volumes": "30",
        "complete": true,
        "genre": "",
        "update": "2020-12-12",
        "row": 5,
        "column": 2,
        "note1": "",
        "note2": ""
    }, {
        "number": "",
        "title": "X맨",
        "author": "",
        "volumes": "55",
        "complete": false,
        "genre": "",
        "update": "2020-12-12",
        "row": 5,
        "column": 2,
        "note1": "요츠바랑",
        "note2": ""
    }
];

const Search = () => {
    const inputRef = useRef();
    const [filterData, setFilterData] = useState(DEMO);

    const replaceHandler = (value) => {
        return value.replace(/(\s*)/g, "").toLowerCase();
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const searchData = replaceHandler(inputRef.current.value);

        if (!searchData) return setFilterData(DEMO);

        const filteredBooks = DEMO.filter((book) => {
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

        setFilterData(filteredBooks);
    }

    return (
        <>
            <S.Search>
                <input type="text" ref={inputRef} onChange={submitHandler} />
                <button type='submit'>검색</button>
            </S.Search>
            {
                filterData.length > 0 ? (
                    <S.Table>
                        <thead>
                            <tr>
                                <th style={{ width: '4rem' }}>책장/칸</th>
                                <th style={{ width: '35%' }}>도서명</th>
                                <th>저자</th>
                                <th style={{ width: '5rem' }}>최종권수</th>
                                <th style={{ width: '5rem' }}>완결여부</th>
                                <th>장르</th>
                                <th style={{ width: '8rem' }}>업데이트 일자</th>
                                <th>비고1</th>
                                <th>비고2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((data, idx) => (
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
                    </S.Table>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )
            }
        </>
    );
}

export default Search;