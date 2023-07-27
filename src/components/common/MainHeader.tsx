import style from './MainHeader.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@/types/AccessTypes'
import { useLocation, useNavigate } from 'react-router-dom'

const MainHeader = () => {
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    employeeNumber: '',
    role: 'ROLE_USER'
  })
  const [link, setLink] = useState<string>('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      setLink('마이페이지')
    } else {
      setLink('일정 조회하러 가기')
    }
  }, [location.pathname])

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get('/DummyUser.json')
      console.log(data)
      const resData: User = data.data.user
      setUser(resData)
      console.log(resData.name)
      console.log(resData.employeeNumber)
      console.log(resData.email)
    } catch (error) {
      console.log('유저 정보를 가져오는데 실패했습니다.')
    }
  }

  const handleLink = () => {
    if (location.pathname === '/') {
      navigate('/mypage')
    } else {
      navigate('/')
    }
  }

  return (
    <div className={style.container}>
      <div className={style.userInfo}>
        <div className={style.wrapper}>
          <div>{`이름: ${user.name}`}</div>
          <div>{`사번: ${user.employeeNumber}`}</div>
          <div>{`이메일: ${user.email}`}</div>
        </div>
      </div>
      <div className={style.welcomeWrapper}>
        <div>
          {user.name} #{user.employeeNumber?.slice(0, 4)}님 환영합니다.
        </div>
        <div className={style.link} onClick={handleLink}>
          {link}
        </div>
      </div>
    </div>
  )
}

export default MainHeader
