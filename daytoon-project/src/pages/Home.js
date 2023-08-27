import React from 'react';
import { Outlet } from 'react-router-dom';

import * as S from '../styles/layout.styled';
import daytoon_symbol_horizontal from '../images/daytoon_symbol_horizontal.svg';

const Home = () => {
    return (
        <>
            <S.Header>
                <img src={daytoon_symbol_horizontal} alt="데이툰" />
            </S.Header>
            <S.Section>
                <Outlet />
            </S.Section>
        </>
    );
}

export default Home;