import React, { useRef, useState } from 'react';

import * as S from '../styles/admin.styled';

// const id="daytoon";
// const pw="daytoon@1";

const Admin = () => {
    const [idError, setIdError] = useState(false);
    const [pwError, setPwError] = useState(false);

    const isValidTestHandler = (testValue, isId=false) => {
        const value = testValue.trim();
        const idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g; // 영문자로 시작하는 영문자 또는 숫자 6~20자 
        const pwRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;  // 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합

        return isId ? idRegExp.test(value) : pwRegExp.test(value);
    }

    const idChangeHandler = (e) => {
        const idIsValid = isValidTestHandler(e.target.value, true);

        console.log("idIsValid : ", idIsValid);
        setIdError(!idIsValid);
    }

    const pwChangeHandler = (e) => {
        const pwIsValid = isValidTestHandler(e.target.value);

        console.log("pwIsValid : ", pwIsValid);
        setPwError(!pwIsValid);
    }
    
    const loginHandler = () => {
        
    }

    const idClass = idError ? 'error' : '';
    const pwClass = pwError ? 'error' : '';

    const disabled = idError|| pwError;

    return (
        <S.Card>
            <form onSubmit={loginHandler}>
                <h1>Admin Login</h1>
                <div className={idClass}>
                    <input type="text" onChange={idChangeHandler} placeholder='아이디를 입력해주세요' />
                </div>
                <div className={pwClass}>
                    <input type="text" onChange={pwChangeHandler} placeholder='비밀번호를 입력해주세요' />
                </div>
                <button type='submit' disabled={disabled}>login</button>
                <button type='text'>join us</button>
                <p>manager contact: 010-8851-3545</p>
            </form>
        </S.Card>
    );
}

export default Admin;