import { annuals } from '@/types/MypageTypes'
import RequestedAnnual from '@/components/mypage/RequestedAnnual'
import ApprovedAnnual from '@/components/mypage/ApprovedAnnual'
import styles from './MyAnnual.module.scss'

// MyAnnual에서 사용할 props 타입 정의
interface MyAnnualProps {
  annualData: annuals[]
}

// 연차 조회 탭을 출력하는 MyAnnual component
const MyAnnual: React.FC<MyAnnualProps> = ({ annualData }) => {
  return (
    <section className={styles.board__container}>
      <RequestedAnnual annualData={annualData} />
      <ApprovedAnnual annualData={annualData} />
    </section>
  )
}

export default MyAnnual
