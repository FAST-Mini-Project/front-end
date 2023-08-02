import baseApi from '@/api'
import {
  userListData,
  workRegistReq,
  workRegistData,
  annualAdminData,
  annualAdminApproveData
} from '@/types/AdminTypes'

// 사용자 목록 조회
export const getUserListApi = async (token: string) => {
  try {
    const res = await baseApi<userListData>({
      method: 'GET',
      url: '/admin/user',
      headers: {
        Authorization: token
      }
    })
    return res.data
  } catch (error) {
    console.error('사용자 목록 조회 api 오류', error)
    return [];
  }
}

// 당직 등록
export const registWorkApi = async (token: string, data: workRegistReq) => {
  try {
    const res = await baseApi<workRegistData>({
      method: 'POST',
      url: '/admin/work',
      headers: {
        Authorization: token
      },
      data: data
    })
    return res.data
  } catch (error) {
    console.error('당직 등록 api 오류', error)
  }
}

// 당직 삭제
export const deleteWorkApi = async (token: string, workId: number) => {
  try {
    const res = await baseApi({
      method: 'DELETE',
      url: `/admin/work/${workId}`,
      headers: {
        Authorization: token
      }
    })
    return res.data
  } catch (error) {
    console.error('당직 삭제 api 오류', error)
  }
}

// 관리자 연차 조회
export const getAnnualAdminApi = async (token: string) => {
  try {
    const res = await baseApi<annualAdminData>({
      method: 'GET',
      url: '/admin/annual',
      headers: {
        Authorization: token
      }
    })
    return res.data
  } catch (error) {
    console.error('관리자 연차 조회 api 오류', error)
  }
}

// 관리자 연차 승인
export const approveAnnualAdminApi = async (token: string, annualId: number) => {
  try {
    const res = await baseApi<annualAdminApproveData>({
      method: 'POST',
      url: `/admin/annual/${annualId}`,
      headers: {
        Authorization: token
      }
    })
    return res.data
  } catch (error) {
    console.error('관리자 연차 승인 api 오류', error)
  }
}

// 관리자 연차 반려
export const rejectAnnualAdminApi = async (token: string, annualId: number) => {
  try {
    const res = await baseApi<annualAdminApproveData>({
      method: 'DELETE',
      url: `/admin/annual/${annualId}`,
      headers: {
        Authorization: token
      }
    })
    return res.data
  } catch (error) {
    console.error('관리자 연차 반려 api 오류', error)
  }
}
