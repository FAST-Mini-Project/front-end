import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './LogIn.module.scss';
import { loginApi } from '@/api/user';
import { setCookie, getCookie } from '@/utils/cookie';
import { Tooltip } from 'antd';
import { emailRegex, passwordRegex } from '@/utils/constants/regex';

const LogIn = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [emailValidateText, setEmailValidateText] = useState('');
  const [passwordValidateText, setPasswordValidateText] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  const token = getCookie('token') || '';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    if (token && user.role) {
      alert('이미 로그인 되어있습니다');
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    validateEmail(loginEmail);
  }, [loginEmail]);

  useEffect(() => {
    validatePassword(loginPassword);
  }, [loginPassword]);

  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginApi({ email: loginEmail, password: loginPassword });
    if (res) {
      if (Array.isArray(res)) {
        alert(res[0]);
      } else {
        console.log(res);
        setCookie('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        res.user.role === 'ROLE_USER' 
        ? navigate('/') 
        : navigate('/admin/employee');
      }
    }
  };

  const validateEmail = (email: string) => {
    const isEmailValid = email !== '' && emailRegex.test(email);
    const isPasswordValid = loginPassword !== '' && passwordRegex.test(loginPassword);
    setIsLoginDisabled(!(isEmailValid && isPasswordValid));

    if (email === '') {
      setEmailValidateText('🙂이메일을 입력해주세요.');
    } else {
      setEmailValidateText(
        isEmailValid 
        ? '✅올바른 이메일 형식입니다.' 
        : '❌이메일 형식이 올바르지 않습니다.'
      );
    }
  };

  const validatePassword = (password: string) => {
    const isEmailValid = loginEmail !== '' && emailRegex.test(loginEmail);
    const isPasswordValid = password !== '' && passwordRegex.test(password);
    setIsLoginDisabled(!(isEmailValid && isPasswordValid));

    if (password === '') {
      setPasswordValidateText('🙂비밀번호를 입력해주세요.');
    } else {
      setPasswordValidateText(
        isPasswordValid 
        ? '✅올바른 비밀번호 형식입니다.' 
        : '❌4자 이상의 비밀번호를 작성해주세요'
      );
    }
  };

  return (
    <form className={style.container} onSubmit={handleLogin}>
      <div className={style.box}>
        <h1 className={style.title}>로그인</h1>
        <Tooltip title={emailValidateText} open={emailFocused} placement="right">
          <input
            className={style.input}
            type="email"
            placeholder="이메일 입력"
            onChange={(e) => setLoginEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            required
          />
        </Tooltip>
        <Tooltip title={passwordValidateText} open={passwordFocused} placement="right">
          <input
            className={style.input}
            type="password"
            placeholder="비밀번호 입력"
            onChange={(e) => setLoginPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            required
          />
        </Tooltip>
        <button
          className={`${style.loginButton} ${isLoginDisabled ? '' : style.disabled}`}
          type="submit"
          disabled={isLoginDisabled}
        >
          로그인
        </button>
        <Link className={style.signupLink} to="/signup">
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default LogIn;
