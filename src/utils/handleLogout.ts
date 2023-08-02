import { logoutApi } from '@/api/user'
import { setCookie, getCookie } from '@/utils/cookie'
import { useNavigate } from 'react-router-dom'

const handleLogout = async (to: string, navigate: ReturnType<typeof useNavigate>) => {
  await logoutApi(getCookie('token')).then((res) => {
    if (res) {
      if (Array.isArray(res)) {
        console.error(res[0])
      } else {
        setCookie('token', '')
        localStorage.removeItem('user')
        alert(res.message)
        navigate(to)
      }
    }
  })
}

export default handleLogout
