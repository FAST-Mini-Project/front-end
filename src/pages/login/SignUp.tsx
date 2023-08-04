import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './SignUp.module.scss'
import { signupApi } from '@/api/user'
import { v4 } from 'uuid'
import { getCookie } from '@/utils/cookie'
import { Tooltip } from 'antd'
import { emailRegex, passwordRegex } from '@/utils/constants/regex'

const SignUp = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [username, setUsername] = useState('')

  //유효성 검사
  const [emailValidateText, setEmailValidateText] = useState('')
  const [passwordValidateText, setPasswordValidateText] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [loginButtonDisabled, setLoginButtonDisabled] = useState<boolean[]>([false, false, false])

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await signupApi({ email: loginEmail, password: loginPassword, name: username, employeeNumber: v4() })
    if (res) {
      if (Array.isArray(res)) {
        alert(res[0])
      } else {
        alert(res.message)
        navigate('/login')
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

  useEffect(() => {
    if (username === '') {
      const updatedLoginButtonDisabled = [...loginButtonDisabled]
      updatedLoginButtonDisabled[2] = false
      setLoginButtonDisabled(updatedLoginButtonDisabled)
    } else {
      const updatedLoginButtonDisabled = [...loginButtonDisabled]
      updatedLoginButtonDisabled[2] = true
      setLoginButtonDisabled(updatedLoginButtonDisabled)
    }
  }, [username])

  return (
    <form className={style.container} onSubmit={handleSignUp}>
      <div className={style.box}>
        <h1 className={style.title}>회원가입</h1>
        <input
          className={style.input}
          placeholder="이름을 입력해주세요"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Tooltip title={emailValidateText} open={emailFocused} placement="right">
          <input
            className={style.input}
            type="email"
            placeholder="이메일을 입력해주세요"
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
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setLoginPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            required
          />
        </Tooltip>
        <button
          className={`${style.signupButton} ${
            loginButtonDisabled.every((check) => check === true) ? '' : style.disabled
          }`}
          onClick={handleSignUp}
          type="submit"
          disabled={loginButtonDisabled.every((check) => check === true) ? false : true}
        >
          회원가입
        </button>
        <div className={style.loginLinkContainer}>
          <span className={style.des}>이미 계정이 있으신가요?</span>
          <Link className={style.loginLink} to="/login">
            로그인하기
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUp
