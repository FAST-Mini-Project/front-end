import style from './Main.module.scss'
import CalendarForm from '@/components/main/CalendarForm'
import { signupApi, loginApi, logoutApi } from '@/api/user'
import { setCookie, getCookie } from '@/utils/cookie'
import { v4 } from 'uuid'
const Main = () => {
  const handleLogout = () => {
    logoutApi(getCookie('token')).then((res) => {
      alert(res?.message)
    })
  }
  const handleSignUp = () => {
    signupApi({ email: 'frontfront@test.com', name: '김프론트', password: '123456789', employeeNumber: v4() })
  }
  const handleLogin = () => {
    loginApi({ email: 'frontfront@test.com', password: '123456789' }).then((res) => {
      console.log(res)
      if (res) {
        setCookie('token', res.token)
        console.log(getCookie('token'))
      }
    })
  }
  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={style.title}>전체 연차/당직 일정</div>
        <CalendarForm />
      </div>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default Main
