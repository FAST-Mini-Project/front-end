import { works } from '@/types/MypageTypes'
import DutyList from '@/components/mypage/DutyList'
import styles from './MyDuty.module.scss'

// MyDuty에서 사용할 props 타입 정의
interface MyDutyProps {
  dutyData: works[]
}

// 당직 조회 탭을 출력하는 MyDuty component
const MyDuty: React.FC<MyDutyProps> = ({ dutyData }) => {
  return (
    <section className={styles.board__container}>
      <DutyList dutyData={dutyData} />
    </section>
  )
}

export default MyDuty
