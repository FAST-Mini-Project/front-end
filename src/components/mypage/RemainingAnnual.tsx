import { annuals } from '@/types/MypageTypes'
import styles from './RemainingAnnual.module.scss'

// RemainingAnnual에서 사용할 props 타입 정의
interface RemainingAnnualProps {
  annualData: annuals[]
}

// 사용 가능한 잔여 연차 개수를 출력하는 RemainingAnnual component
// 1년 연차 갯수(15개) - 승인 처리된 연차 갯수 차감
const RemainingAnnual: React.FC<RemainingAnnualProps> = ({ annualData }) => {
  const remainingAnnualCount = () => {
    // 메인 캘린더에서 신청한 연차 중 승인된 연차 목록 Filtering
    const approvedAnnualData = annualData.filter((annual) => annual.status === 'APPROVED')

    // 승인된 연차 갯수 Count
    const approvedAnnuals = approvedAnnualData.length

    // 잔여 연차 갯수 Count
    const remainingAnnuals = 15 - approvedAnnuals

    return remainingAnnuals
  }

  const remainingAnnuals = remainingAnnualCount()

  return (
    <span className={styles.remainingAnnual__container}>
      <h3>잔여 연차 갯수</h3>
      <p>{remainingAnnuals} / 15</p>
    </span>
  )
}

export default RemainingAnnual