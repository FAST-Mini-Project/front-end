import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './LogIn.module.scss'
import { loginApi } from '@/api/user'
import { setCookie, getCookie } from '@/utils/cookie'
import { Tooltip } from 'antd'
import { emailRegex, passwordRegex } from '@/utils/constants/regex'

const LogIn = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  //유효성 검사
  const [emailValidateText, setEmailValidateText] = useState('')
  const [passwordValidateText, setPasswordValidateText] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [loginButtonDisabled, setLoginButtonDisabled] = useState<boolean[]>([false, false])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await loginApi({ email: loginEmail, password: loginPassword })
    if (res) {
      if (Array.isArray(res)) {
        //errorMessage
        alert(res[0])
      } else {
        // success
        console.log(res)
        setCookie('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        // 유저 유형에 따라 페이지 이동 (추후 관리자 accessToken 환경변수로 검증?)
        if (res.user.role === 'ROLE_USER') {
          navigate('/')
        } else {
          navigate('/admin/employee')
        }
      }
    }
  }
  const token = getCookie('token') || ''
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  useEffect(() => {
    if (token && user.role) {
      alert('이미 로그인 되어있습니다')
      navigate(-1)
    }
  }, [])

  useEffect(() => {
    if (loginEmail === '') {
      setEmailValidateText('🙂이메일을 입력해주세요.')
    } else {
      if (emailRegex.test(loginEmail)) {
        setEmailValidateText('✅올바른 이메일 형식입니다.')
        const updatedLoginButtonDisabled = [...loginButtonDisabled]
        updatedLoginButtonDisabled[0] = true
        setLoginButtonDisabled(updatedLoginButtonDisabled)
      } else {
        setEmailValidateText('❌이메일 형식이 올바르지 않습니다.')
        const updatedLoginButtonDisabled = [...loginButtonDisabled]
        updatedLoginButtonDisabled[0] = false
        setLoginButtonDisabled(updatedLoginButtonDisabled)
      }
    }
  }, [loginEmail])

  useEffect(() => {
    if (loginPassword === '') {
      setPasswordValidateText('🙂비밀번호를 입력해주세요.')
    } else {
      if (passwordRegex.test(loginPassword)) {
        setPasswordValidateText('✅올바른 비밀번호 형식입니다.')
        const updatedLoginButtonDisabled = [...loginButtonDisabled]
        updatedLoginButtonDisabled[1] = true
        setLoginButtonDisabled(updatedLoginButtonDisabled)
      } else {
        setPasswordValidateText('❌8자 이상의 비밀번호를 작성해주세요')
        const updatedLoginButtonDisabled = [...loginButtonDisabled]
        updatedLoginButtonDisabled[1] = false
        setLoginButtonDisabled(updatedLoginButtonDisabled)
      }
    }
  }, [loginPassword])

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
          className={`${style.loginButton} ${
            loginButtonDisabled.every((check) => check === true) ? '' : style.disabled
          }`}
          onClick={handleLogin}
          type="submit"
          disabled={loginButtonDisabled.every((check) => check === true) ? false : true}
        >
          로그인
        </button>
        <Link className={style.signupLink} to="/signup">
          회원가입
        </Link>
      </div>
    </form>
  )
}

export default LogIn
