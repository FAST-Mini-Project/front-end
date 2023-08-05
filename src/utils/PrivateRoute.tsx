import { Outlet, Navigate } from 'react-router-dom'
import { getCookie } from '@/utils/cookie'

export const UserPrivateRoute = () => {
  const token = getCookie('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (token && user.role) {
    // 일반 유저
    return <Outlet />
  }
  alert('로그인이 필요합니다.')
  return <Navigate to="/login" />
}

// export const AdminPrivateRoute = async () => {
//   const token = getCookie('token')
//   const user = JSON.parse(localStorage.getItem('user') || '{}')

//   if (!token && !user) {
//     alert('로그인이 필요합니다.')
//     return <Navigate to="/login" />
//   } else {
//     const res = await adminAuthApi(token)
//     if (res && res.status === 200) {
//       alert(res.data)
//       return <Outlet />
//     } else if (res && (res.status === 401 || res.status === 403)) {
//       alert(res.data)
//       return <Navigate to="/" />
//     } else {
//       alert('관리자 권한이 필요합니다.')
//       return <Navigate to="/" />
//     }
//   }
// }
