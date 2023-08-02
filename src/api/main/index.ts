import baseApi from '@/api'
import { annualData, workData, annualApplyReq, annualApplyData } from '@/types/MainTypes'

//일정 목록 조회 (연차)
export const getAnnualApi = async (year: number, month: number) => {
  try {
    const res = await baseApi.get<annualData>(`/schedule/annual?year=${year}&month=${month}`)
    return res.data
  } catch (error) {
    console.error('연차 일정 목록을 불러올 수 없습니다.', error)
  }
}

//일정 목록 조회 (당직)
export const getWorkApi = async (year: number, month: number) => {
  try {
    const res = await baseApi.get<workData>(`/schedule/work?year=${year}&month=${month}`)
    return res.data
  } catch (error) {
    console.error('당직 일정목록을 불러올 수 없습니다.', error)
  }
}

// 연차 등록 신청
export const annualApplyApi = async (data: annualApplyReq) => {
  try {
    const res = await baseApi.post<annualApplyData>('/schedule/annual', data)
    return res.data
  } catch (error) {
    console.error('연차 등록에 에러', error)
  }
}
