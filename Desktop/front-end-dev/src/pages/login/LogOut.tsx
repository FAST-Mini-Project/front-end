import { useNavigate } from 'react-router-dom'
import style from './LogOut.module.scss'

export const Logout = () => {
  const navigate = useNavigate()

  // 로그아웃 처리
  const handleLogOut = () => {
    navigate('/login')
  }

  return (
    <>
      <TabItem>
        <button onClick={handleLogOut} />
      </TabItem>
    </>
  )
}

const TabItem = styled.li`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 24px;
  cursor: pointer;
`
