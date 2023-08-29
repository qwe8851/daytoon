import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import genresData from '../assets/json/genreData.json';

import * as S from '../styles/admin.styled';
import * as L from '../styles/layout.styled';

const BookDetail = () => {
    const navigate = useNavigate();

    const titleRef = useRef(null);  // 필수
    const authorRef = useRef(null);    // 필수
    const volumesRef = useRef(null);
    const completedRef = useRef(null);
    const genreRef = useRef(null);
    const rowRef = useRef(null);       // 필수
    const columnRef = useRef(null);    // 필수
    const note1Ref = useRef(null);
    const note2Ref = useRef(null);
    const descriptionRef = useRef(null);

    const fetchHandler = async () => {
        try {
            const date = new Date();
            const formattedDate = format(date, 'yyyy-MM-dd');

            const response = await fetch('http://localhost:5000/main',{
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    "title": titleRef.current.value.trim(),
                    "author": authorRef.current.value.trim(),
                    "volumes": volumesRef.current.value,
                    "completed": completedRef.current.value,
                    "genre": genreRef.current.value,
                    "update": formattedDate,
                    "row": rowRef.current.value,
                    "column": columnRef.current.value,
                    "note1": note1Ref.current.value.trim(),
                    "note2": note2Ref.current.value.trim(),
                    "description": descriptionRef.current.value.trim(),
                }),
            });

            const data = await response.json();

            if(data.success){
                alert(`추가되었습니다!`);
                navigate('/admin');
            }else{
                throw new Error(data.error);
            }
        } catch (error) {
            console.log(error);
            alert(`입력 데이터를 확인바랍니다. \n${error.message}`);
        }

    }

    const submitHandler = (e) => {
        e.preventDefault();

        const genre = genreRef.current;
        const title = titleRef.current;
        const author = authorRef.current;
        const completed = completedRef.current;
        const row = rowRef.current;
        const column = columnRef.current;

        if (genre.value < 0) {
            alert("장르를 선택해주세요!");
            return genre.focus();
        }
        
        if (!title.value.trim()){
            alert("도서명을 입력해주세요!");
            return title.focus();
        } 
        else if (title.value.trim().length > 100){
            alert("도서명은 100자 이내로 입력 가능합니다.");
            return title.focus();
        }
        
        if (!author.value.trim()){
            alert("저자를 입력해주세요!");
            return author.focus();
        }
        else if (author.value.trim().length > 100) {
            alert("저자는 100자 이내로 입력 가능합니다");
            return author.focus();
        }

        if (parseInt(volumesRef.current.value) > 5000) {
            alert("최종권수는 5000이하의 수만 입력 가능합니다.");
            return volumesRef.current.focus();
        } 
        
        if (!completed.value.trim()){
            alert("완결여부를 선택해주세요!");
            return completed.focus();
        } 
        
        if (!row.value){
            alert("책장번호를 입력해주세요!");
            return row.focus();
        } 
        else if (isNaN(parseInt(row.value))) {
            alert("책장번호는 숫자만 입력 가능합니다.");
            return row.focus();
        } 
        else if (parseInt(row.value) > 500) {
            alert("책장번호는 500이하의 수만 입력 가능합니다.");
            return row.focus();
        } 
        
        if (!column.value){
            alert("칸번호를 입력해주세요!");
            return column.focus();
        } 
        else if (isNaN(parseInt(column.value))) {
            alert("칸번호는 숫자만 입력 가능합니다.");
            return column.focus();
        }
        else if (parseInt(column.value) > 500) {
            alert("칸번호는 500이하의 수만 입력 가능합니다.");
            return column.focus();
        } 

        if (note1Ref.current.value.trim().length > 100) {
            alert("비고란은 100자 이내로 입력 가능합니다.");
            return note1Ref.current.focus();
        } 
        if (note2Ref.current.value.trim().length > 100) {
            alert("비고란은 100자 이내로 입력 가능합니다.");
            return note2Ref.current.focus();
        } 

        if (descriptionRef.current.value.trim().length > 5000 ) {
            alert("설명란은 5000자 이내로 입력 가능합니다.");
            return descriptionRef.current.focus();
        } 

        fetchHandler();
    }

    return (
        <S.Card $width='50' $padding='0 1rem'>
            <form onSubmit={submitHandler}>
                <div>
                    <label><span className='essential'>*</span> 장르</label>
                    <select name='genre' ref={genreRef}>
                        {genresData.map((genre) => (
                            <option key={genre.number} value={genre.number}>{genre.value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label><span className='essential'>*</span> 도서명</label>
                    <input type="text" name='title' ref={titleRef} placeholder='도서명을 100자 이내로 입력해주세요'/>
                </div>
                <div>
                    <label><span className='essential'>*</span> 저자</label>
                    <input type="text" name='author' ref={authorRef} placeholder='저자를 100자 이내로 입력해주세요'/>
                </div>
                <div>
                    <label>최종권수</label>
                    <input type="number" name='volumes' min='0' ref={volumesRef} placeholder='최종권수를 5000이하의 숫자로 입력해주세요' />
                </div>
                <div>
                    <label><span className='essential'>*</span> 완결여부</label>
                    <L.ButtonList>
                        <label htmlFor="1"><input type="radio" id="1" name="completed" value='true' ref={completedRef} />완결</label>
                        <label htmlFor="0"><input type="radio" id="0" name="completed" value='false' ref={completedRef} defaultChecked />미완결</label>
                    </L.ButtonList>
                </div>
                <div>
                    <label><span className='essential'>*</span> 책장번호</label>
                    <input type="number" name='row' ref={rowRef} placeholder='책장번호를 500이하의 숫자로 입력해주세요.' />
                </div>
                <div>
                    <label><span className='essential'>*</span> 칸번호</label>
                    <input type="number" name='column' ref={columnRef} placeholder='칸번호를 500이하의 숫자로 입력해주세요.' />
                </div>
                <div>
                    <label>비고1</label>
                    <input type="text" name='note1' ref={note1Ref} placeholder='비고1을 100자 이내로 입력해주세요' />
                </div>
                <div>
                    <label>비고2</label>
                    <input type="text" name='note2' ref={note2Ref} placeholder='비고2을 100자 이내로 입력해주세요' />
                </div>
                <div>
                    <label>설명</label>
                    <textarea type="text" name='description' ref={descriptionRef} placeholder='설명란을 5000자 이내로 입력해주세요' />
                </div>
                <L.ButtonList>
                    <button type='submit'>추가</button>
                    <button type='button' className='cancel' onClick={() => navigate(-1)}>취소</button>
                </L.ButtonList>
            </form>
        </S.Card>
    );
}

export default BookDetail;