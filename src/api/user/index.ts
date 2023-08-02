import baseApi from '@/api'
import { LoginReq, SignupReq, LoginResData, SignupResData, LogoutResData } from '@/types/AccessTypes'

//login
export const loginApi = async (data: LoginReq) => {
  try {
    const res = await baseApi.post('/login', data)
    console.log(res)
    if (res.data.data) {
      return res.data.data as LoginResData
    }
    if (res.data.errorMessage) {
      return res.data.errorMessage as string[]
    }
  } catch (error) {
    console.error('로그인 api 오류', error)
  }
}

//signUp
export const signupApi = async (data: SignupReq) => {
  try {
    const res = await baseApi.post('/signup', data)
    if (res.data.data) {
      return res.data.data as SignupResData
    }
    if (res.data.errorMessage) {
      return res.data.errorMessage as string[]
    }
  } catch (error) {
    console.error('회원가입 api 오류', error)
  }
}

//logout
export const logoutApi = async (token: string) => {
  try {
    const res = await baseApi({
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.data.data) {
      return res.data.data as LogoutResData
    }
    if (res.data.errorMessage) {
      return res.data.errorMessage as string[]
    }
  } catch (error) {
    console.error('로그아웃 api 오류', error)
  }
}
