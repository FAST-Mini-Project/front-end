import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './SignUp.module.scss'
import { signupApi } from '@/api/user'
import { v4 } from 'uuid'
import { getCookie } from '@/utils/cookie'

const SignUp = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSignUp = async () => {
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

        <input
          className={style.input}
          type="email"
          placeholder="이메일을 입력해주세요"
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />

        <input
          className={style.input}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />

        <button className={style.signupButton} onClick={handleSignUp} type="submit">
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
