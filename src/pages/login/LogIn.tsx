import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './LogIn.module.scss';


const LogIn = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('test@naver.com');
  const [loginPassword, setLoginPassword] = useState('11111111');
  // const [token, setToken] = useUserToken();
  // const [role, setRole] = useUserRole();

  // useEffect(() => {
  //   checkLogIn();
  // }, []);

  // const checkLogIn = () => {
  //   if (loginEmail && loginPassword) {
  //     navigate('/');
  //   } else {
  //     navigate('/login');
  //   }
  // };

  const handleLogin = async () => {
    e.preventDefault();
    // if (data.success) {
      navigate('/');
    // } 
  };

  // Mock response:
  // const data = {
  //   statusCode: 200,
  //   data: {
  //     user: {
  //       email: "test@naver.com",
  //       name: "김테스트",
  //       employeeNumber: "12312saddf",
  //       role: "ROLE_ADMIN", 
  //     },
  //     token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCIangstJaWi343",
  //   },
  // };

  // if (data.statusCode === 200) {
  //   setToken(data.data.token);        
  //   setRole(data.data.user.role);  

  //   if (data.data.user.role === "ROLE_USER") {
  //     navigate("/");
  //   } else if (data.data.user.role === "ROLE_ADMIN") {
  //     navigate("/admin");
  //   }
  // };

  return (
    <form className={style.container} onSubmit={handleLogin}>
      <h1 className={style.title}>연차 당직 관리</h1>
      <div className={style.line} />
      <img className={style.mainLogo} 
        src="/free-icon-calendar-2738431.png" 
        alt="달력" />
      <div className={style.box}>
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

        <button className={style.loginButton} 
          onClick={handleLogin}
          type="submit">
          로그인
        </button>
        <Link className={style.signupLink} 
          to="/signup">
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default LogIn;
