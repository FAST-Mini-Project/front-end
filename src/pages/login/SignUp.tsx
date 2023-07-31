import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SignUp.module.scss';

const SignUp = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('test@naver.com');
  const [loginPassword, setLoginPassword] = useState('11111111');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // if (data.success) {
      navigate('/login');
    // } 
  };

  return (
    <form className={style.container} onSubmit={handleSignUp}>
      <h1 className={style.title}>연차 당직 관리</h1>
      <div className={style.line} />
      <img className={style.mainLogo} 
        src="/free-icon-calendar-2738431.png" 
        alt="달력" />
      <div className={style.box}>
        <input className={style.input}  
          placeholder="이름 입력" 
          onChange={(e) => setLoginEmail(e.target.value)} 
          required/>
          
        <input className={style.input}  
          placeholder="사원번호 입력" 
          onChange={(e) => setLoginEmail(e.target.value)} 
          required/>

        <input className={style.input} 
          type="email" 
          placeholder="이메일 입력" 
          onChange={(e) => setLoginEmail(e.target.value)} 
          required/>

        <input className={style.input} 
          type="password" 
          placeholder="비밀번호 입력" 
          onChange={(e) => setLoginPassword(e.target.value)} 
          required/>

        <button className={style.signupButton} 
          onClick={handleSignUp}
          type="submit">
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignUp;
