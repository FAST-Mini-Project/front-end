// 개인 연차 조회
// GET /api/user/annual?year={year}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

// Req : 없음
// Res 200 OK
// interface annualUserRes {
//   statusCode: number
//   data: annualUserData
// }

export type annualUserData = annuals[]

export interface annuals {
  annualId: number
  date: string
  status: 'APPROVED' | 'CANCELED' | 'UNAPPROVED'
}

// 개인 연차 취소 / 취소 신청
// POST /api/user/annual/{annualId}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'
// - 신청한 연차 (UNAPPROVED)
//     - 바로 삭제됨
// - 승인된 연차 (APPROVED)
//     - 상태가 CANCELED로 바뀌고, 관리자 취소 목록에 보이게됨.
//     - 관리자가 취소 승인하면 그때 삭제됨

// req : 없음
// Res 200 OK
// interface annualCancelRes {
//   statusCode: number
//   data: annualCancelData
// }
export interface annualCancelData {
  message: string // "연차 취소가 완료되었습니다" | "연차 취소 신청이 완료되었습니다"
}

// 개인 당직 조회
// GET /api/user/work?year={year}&month={month}
// \ -H 'Authorization: "asjldhaslkjdhaslkjdhalskjdhalskj"'

// Req : 없음

// Res 200 OK
// interface workUserRes {
//   statusCode: number
//   data: workUserData
// }

export type workUserData = works[]

export interface works {
  dutyId: number
  date: string // YYYY-MM-DD
}
