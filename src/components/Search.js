import React, { useRef, useState } from 'react';

const DEMO = [
    {
        "name": "요츠바랑",
        "day": "2023-03-12",
        "row": 20,
        "column": 2,
    }, {
        "name": "바닷마을 다이어리",
        "day": "2023-03-08",
        "row": 32,
        "column": 5,
    }, {
        "name": "플라워 오브 라이프",
        "day": "2021-04-12",
        "row": 14,
        "column": 2,
    }, {
        "name": "너에게 닿기를",
        "day": "2020-12-12",
        "row": 5,
        "column": 1,
    }, {
        "name": "체인소맨",
        "day": "2020-12-12",
        "row": 5,
        "column": 1,
    }, {
        "name": "X맨",
        "day": "2020-12-12",
        "row": 5,
        "column": 1,
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
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" ref={inputRef} />
                <button type='submit'>검색</button>
            </form>
            {
                filterData.length > 0 ? filterData.map((data, idx) => (
                    <div key={idx}>{data.name}</div>
                )) : (
                    <p>검색 결과가 없습니다.</p>
                )
            }
        </div>
    );
}

export default Search;