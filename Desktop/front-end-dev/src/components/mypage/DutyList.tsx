import { works } from '@/types/MypageTypes'
import styles from './DutyList.module.scss'

// DutyList에서 사용할 props 타입 정의
interface MyDutyProps {
  dutyData: works[]
}

const DutyList: React.FC<MyDutyProps> = ({ dutyData }) => {
  // 근무 날짜가 최신이면 상단으로 오도록 최신 순 정렬
  const sortedByDate = dutyData.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <section className={styles.list__container}>
      <h2>등록된 당직 일정</h2>
      <div className={styles.list__body}>
        <div className={styles.list__headline}>
          <p>근무 날짜</p>
        </div>
        <ul className={styles.list__items}>
          {sortedByDate.map((duty) => (
            <li key={duty.dutyId} className={styles.list__item}>
              <span>{duty.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DutyList
