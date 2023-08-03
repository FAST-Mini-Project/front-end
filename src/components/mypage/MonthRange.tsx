import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import styles from './MonthRange.module.scss'

// MonthRange에서 사용할 props 타입 정의
interface MonthRangeProps {
  selectedYear: number
  selectedMonth: number
  onPrevMonthClick: () => void
  onNextMonthClick: () => void
  onMonthChange: (year: number, month: number) => void
}

// 연차 및 당직 리스트에서 년도와 월을 선택하여 조회할 수 있는 MonthRange component
const MonthRange: React.FC<MonthRangeProps> = ({ selectedYear, selectedMonth, onPrevMonthClick, onNextMonthClick }) => {
  return (
    <div className={styles.range__container}>
      <HiChevronLeft onClick={onPrevMonthClick} className={styles.button__left} />
      <p>{`${selectedYear}년 ${selectedMonth}월`}</p>
      <HiChevronRight onClick={onNextMonthClick} className={styles.button__right} />
    </div>
  )
}

export default MonthRange
