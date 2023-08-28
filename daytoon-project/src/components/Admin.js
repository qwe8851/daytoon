import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const isLogin = sessionStorage.getItem('user');

        if (!isLogin){
            navigate('/admin/signin');
        }
    }, [navigate]);



    return <h1>admin</h1>;
}

export default Admin;