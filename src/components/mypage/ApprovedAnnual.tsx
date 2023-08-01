import { annuals } from '@/types/MypageTypes'
import styles from './ApprovedAnnual.module.scss'

// ApprovedAnnual에서 사용할 props 타입 정의
interface ApprovedAnnualProps {
  annualData: annuals[]
}

// 승인된 연차 목록을 출력할 ApprovedAnnual component
const ApprovedAnnual: React.FC<ApprovedAnnualProps> = ({ annualData }) => {
  // 메인 캘린더에서 신청한 연차 중 승인된 연차 목록 Filtering
  const approvedAnnualData = annualData.filter((annual) => annual.status === 'APPROVED')

  // 최근 신청한 내용이 상단으로 오도록 최신 순 정렬
  const sortedByDate = approvedAnnualData.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return dateB.getTime() - dateA.getTime()
  })

  // 오늘 날짜 확인
  const currentDate = new Date()

  return (
    <section className={styles.list__container}>
      <h2>승인된 연차</h2>
      <div className={styles.list__body}>
        <div className={styles.list__headline}>
          <p>신청 날짜</p>
          <p>진행 상태</p>
          <p>신청 취소</p>
        </div>
        <ul className={styles.list__items}>
          {sortedByDate.map((annual) => {
            // 연차 목록 중 날짜가 지난 경우 신청 취소 불가능(당일까지는 가능)
            // button 스타일링도 disabled 처리
            const itemDate = new Date(annual.date)
            const isPastDate = itemDate <= currentDate

            return (
              <li key={annual.annualId} className={styles.list__item}>
                <span>{annual.date}</span>
                <span>{annual.status === 'APPROVED' ? '승인 완료' : ''}</span>
                <button disabled={isPastDate} title={isPastDate ? '날짜가 지난 경우 취소할 수 없습니다.' : ''}>
                  취소
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default ApprovedAnnual
