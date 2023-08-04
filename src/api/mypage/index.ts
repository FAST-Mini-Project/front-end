import baseApi from '@/api'
import { annualUserData, annualCancelData, workUserData } from '@/types/MypageTypes'

// 개인 연차 조회
export const getUserAnnualApi = async (token: string, year: number) => {
  try {
    const res = await baseApi({
      method: 'GET',
      url: `/user/annual?year=${year}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) return res.data.data as annualUserData
  } catch (error) {
    console.error('개인 연차 조회 api 오류', error)
  }
}

// 개인 당직 조회
export const getUserWorkApi = async (token: string, year: number, month: number) => {
  try {
    const res = await baseApi({
      method: 'GET',
      url: `/user/work?year=${year}&month=${month}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) return res.data.data as workUserData
  } catch (error) {
    console.error('개인 당직 조회 api 오류', error)
  }
}

// 개인 연차 취소 / 취소 신청
export const cancelAnnualApi = async (token: string, annualId: number) => {
  try {
    const res = await baseApi<annualCancelData>({
      method: 'POST',
      url: `/user/annual/${annualId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    console.error('개인 연차 취소 / 취소 신청 api 오류', error)
  }
}
