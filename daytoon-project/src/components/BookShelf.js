import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import genresData from '../assets/json/genreData.json'; 

import * as S from '../styles/admin.styled';
import * as L from '../styles/layout.styled';

const BookShelf = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = sessionStorage.getItem('user');
        if (!isLogin) navigate('/admin/signin');
    }, [navigate]);

    const searchHandler = () => {
    
    }
    
    return (
        <S.Card $width="40" $direction="column">
            <L.Article>
                <S.SearchBar>
                    <select id="genre" >
                        {genresData.map((genre) => (
                            <option key={genre.number} value={genre.number}>{genre.value}</option>
                        ))}
                    </select>
                    <input type="text" placeholder='도서명을 입력해주새요' />
                    <button type='button' onClick={searchHandler()}>검색</button>
                </S.SearchBar>
                <S.OptionBar>
                    <button type='button' className='delete'>선택삭제</button>
                    <button type='button' onClick={() => navigate('/admin/detail')} className='add'>추가</button>
                    <button type='button' className='upload'>Excel</button>
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
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </L.Table>
            </L.Article>
        </S.Card>
    );
}

export default BookShelf;