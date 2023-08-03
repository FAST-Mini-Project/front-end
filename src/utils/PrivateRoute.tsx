import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { getCookie } from '@/utils/cookie'

export const UserPrivateRoute = () => {
  const token = getCookie('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (token && user.role === 'ROLE_USER') {
    // 일반 유저
    return <Outlet />
  }
  alert('로그인이 필요합니다.')
  return <Navigate to="/login" />
}

export const AdminPrivateRoute = () => {
  const token = getCookie('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (token && user.role === 'ROLE_ADMIN') {
    // 일반 유저
    return <Outlet />
  }
  alert('로그인이 필요합니다.')
  return <Navigate to="/login" />
}
