import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import * as S from '../styles/layout.styled';
import daytoon_symbol_horizontal from '../assets/images/daytoon_symbol_horizontal.svg';

const Home = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.includes('/admin');

    return (
        <>
            <S.Header>
                <img src={daytoon_symbol_horizontal} alt="데이툰" />
                {isAdminPage && <p>Admin</p>}
            </S.Header>
            <S.Section>
                <Outlet />
            </S.Section>
        </>
    );
}

export default Home;