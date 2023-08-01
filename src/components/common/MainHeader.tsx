import style from './MainHeader.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@/types/AccessTypes'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { BsFillCalendarWeekFill, BsPersonBadgeFill } from 'react-icons/bs'
import { RiLogoutBoxFill } from 'react-icons/ri'

const MainHeader = () => {
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    employeeNumber: '',
    role: 'ROLE_USER'
  })
  const location = useLocation()
  const navigate = useNavigate()

  //랜딩 시 유저 정보를 가져옵니다.
  useEffect(() => {
    fetchUserInfo()
  }, [])

  //가짜 비동기 함수
  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get('/DummyUser.json')
      console.log(data)
      const resData: User = data.data.user
      setUser(resData)
    } catch (error) {
      console.log('유저 정보를 가져오는데 실패했습니다.')
    }
  }

  const handleLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement
    if (target.innerText === '전체 일정 보기') {
      navigate('/')
    } else if (target.innerText === '마이페이지') {
      navigate('/mypage')
    } else {
      navigate('/')
    }
  }

  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div className={style.userInfo}>
          <div className={style.iconWrapper}>
            <img className={style.icon} src="/free-icon-employee-3043585.png" alt="" />
          </div>
          <div className={style.userWrapper}>
            <div className={style.user}>{`${user.name}#${user.employeeNumber.slice(0, 3)}`}</div>
            <span className={style.role}>유저</span>
          </div>
        </div>
        <div className={style.nav}>
          <div className={`${style.navItem} ${location.pathname === '/' ? style.active : ''}`} onClick={handleLink}>
            <BsFillCalendarWeekFill size="20" />
            <span style={{ marginLeft: '10px' }}>전체 일정 보기</span>
          </div>
          <div
            className={`${style.navItem} ${location.pathname === '/mypage' ? style.active : ''}`}
            onClick={handleLink}
          >
            <BsPersonBadgeFill size="20" />
            <span style={{ marginLeft: '10px' }}>마이페이지 </span>
          </div>
          <div
            className={`${style.navItem} ${location.pathname === '/logout' ? style.active : ''}`}
            onClick={handleLink}
          >
            <RiLogoutBoxFill size="20" />
            <span style={{ marginLeft: '10px' }}>로그아웃</span>
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.des}>Fast Campus MiniProject TEAM2</div>
          <div className={style.duration}>2023.07.24 ~ 2021.08.10</div>
          <div className={style.copy}>
            <span>© Icon by</span> <br />
            <a href="https://www.flaticon.com/kr/free-icons/" title="직원 아이콘">
              ultimatearm - Flaticon
            </a>
          </div>
          <a className={style.link} href="https://github.com/FAST-Mini-Project" target="_blank">
            GitHub <AiFillGithub size="24" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
