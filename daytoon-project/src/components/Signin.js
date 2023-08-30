import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as S from '../styles/components.styled';

const Signin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
        passwordCheck: '',
    });

    const [errors, setErrors] = useState({
        id: true,
        password: true,
    });

    const [click, setClick] = useState({
        id: false,
        password: false,
    });

    const isValidTestHandler = (testValue, isId = false) => {
        const value = testValue.trim();
        const idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g; // 영문자로 시작하는 영문자 또는 숫자 6~20자 
        const pwRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;  // 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합

        return isId ? idRegExp.test(value) : pwRegExp.test(value);
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;

        const testValid = name === 'id' 
            ? isValidTestHandler(value, true)
            : isValidTestHandler(value);

        setFormData({
            ...formData,
            [name]: value.trim(),
        });

        setClick({
            ...click,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: !testValid,
        });
    }

    const disabled = errors.id || errors.password;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (disabled) return;

        try {
            const response = await fetch('http://localhost:5000/member/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formData.id,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem("user", formData.id);
                
                alert(`${formData.id}님! 로그인되었습니다`);
                navigate('/admin');
            } else { 
                throw new Error(data.error);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const idClass = click.id && errors.id ? 'error' : '';
    const pwClass = click.password && errors.password ? 'error' : '';

    return (
        <S.Card>
            <form onSubmit={submitHandler}>
                <h1>Admin Login</h1>
                <div className={idClass}>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={changeHandler}
                        placeholder='아이디를 입력해주세요' />
                </div>
                <div className={pwClass}>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='비밀번호를 입력해주세요' />
                </div>
                <button type='submit' disabled={disabled}>login</button>
                <hr />
                <Link to="/admin/signup"><button type='text'>join us</button></Link>
                <p>manager contact: 010-8851-3545</p>
            </form>
        </S.Card>
    );
}

export default Signin;