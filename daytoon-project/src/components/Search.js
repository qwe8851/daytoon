import React, { useRef, useState } from 'react';

import * as S from '../styles/search.styled';

const DEMO = [
    {
        "number": "",
        "title": "요츠바랑",
        "author": "",
        "volumes": "",
        "complete": false,
        "genre": "",
        "update": "2023-03-12",
        "row": 20,
        "column": 2,
        "note1": "",
        "note2": "",
    }, {
        "number": "",
        "title": "바닷마을 다이어리",
        "author": "",
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
        "author": "",
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
        "author": "",
        "volumes": "",
        "complete": false,
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
        "volumes": "",
        "complete": false,
        "genre": "",
        "update": "2020-12-12",
        "row": 5,
        "column": 1,
        "note1": "",
        "note2": ""
    }, {
        "number": "",
        "title": "X맨",
        "author": "",
        "volumes": "",
        "complete": false,
        "genre": "",
        "update": "2020-12-12",
        "row": 5,
        "column": 1,
        "note1": "",
        "note2": ""
    }
];

const Search = () => {
    const inputRef = useRef();
    const [filterData, setFilterData] = useState(DEMO);

    const replaceHandler = (value) => {
        return value.replace(/(\s*)/g, "");
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const replaceData = replaceHandler(inputRef.current.value);
        const searchData = replaceData.toLowerCase();

        const filteredBooks = DEMO.filter((book) => {
            const replaceBookName = replaceHandler(book.name);
            const bookName = replaceBookName.toLowerCase();

            return bookName.includes(searchData);
        });

        setFilterData(filteredBooks);
    }

    return (
        <>
            <S.Form onSubmit={submitHandler}>
                <input type="text" ref={inputRef} onChange={submitHandler} />
                <button type='submit'>검색</button>
            </S.Form>
            <table>
                <thead>
                    <tr>
                        <th>책장/칸</th>
                        <th>도서명</th>
                        <th>저자</th>
                        <th>최종권수</th>
                        <th>완결여부</th>
                        <th>장르</th>
                        <th>업데이트 일자</th>
                        <th>비고1</th>
                        <th>비고2</th>
                    </tr>
                </thead>
                {
                    filterData.length > 0 ? (
                        <tbody>
                            { filterData.map((data, idx) => (
                                <tr key={idx}>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                    <td>{data.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )
                }   
            </table>
        </>
    );
}

export default Search;