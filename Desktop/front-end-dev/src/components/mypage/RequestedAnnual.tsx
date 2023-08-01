import { annuals } from '@/types/MypageTypes'
import styles from './RequestedAnnual.module.scss'

// RequestedAnnual에서 사용할 props 타입 정의
interface RequestedAnnualProps {
  annualData: annuals[]
}

// 신청한 연차 목록을 출력할 RequestedAnnual component
const RequestedAnnual: React.FC<RequestedAnnualProps> = ({ annualData }) => {
  // 메인 캘린더에서 신청한 연차 중 아직 승인되지 않은 연차 목록 Filtering
  const requestedAnnualData = annualData.filter((annual) => annual.status === 'UNAPPROVED')

  // 최근 신청한 내용이 상단으로 오도록 최신 순 정렬
  const sortedByDate = requestedAnnualData.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return dateB.getTime() - dateA.getTime()
  })

  // 취소 버튼 클릭 시 연차 신청을 취소하는 함수
  // const handleCancelClick = (annualId: number) => {
  //   const confirmMessage = window.confirm('확인 버튼을 누르면 연차 신청이 취소됩니다.\n 정말 연차 신청을 취소하시겠습니까?')
  //   if (confirmMessage) {

  //   }
  // }

  return (
    <section className={styles.list__container}>
      <h2>신청한 연차</h2>
      <div className={styles.list__body}>
        <div className={styles.list__headline}>
          <p>신청 날짜</p>
          <p>진행 상태</p>
          <p>신청 취소</p>
        </div>
        <ul className={styles.list__items}>
          {sortedByDate.map((annual) => (
            <li key={annual.annualId} className={styles.list__item}>
              <span>{annual.date}</span>
              <span>{annual.status === 'UNAPPROVED' ? '승인 처리 중' : ''}</span>
              <button>취소</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default RequestedAnnual
