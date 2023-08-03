import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './LogIn.module.scss'
import { loginApi } from '@/api/user'
import { setCookie } from '@/utils/cookie'

const LogIn = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

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

  return (
    <form className={style.container} onSubmit={handleLogin}>
      {/* <div className={style.line} /> */}
      {/* <img className={style.mainLogo} src="/free-icon-calendar-2738431.png" alt="달력" /> */}
      <div className={style.box}>
        <h1 className={style.title}>로그인</h1>
        <input
          className={style.input}
          type="email"
          placeholder="이메일 입력"
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
        <input
          className={style.input}
          type="password"
          placeholder="비밀번호 입력"
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
        <button className={style.loginButton} onClick={handleLogin} type="submit">
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
