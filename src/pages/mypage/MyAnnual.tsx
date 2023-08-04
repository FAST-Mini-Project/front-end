import { useState } from 'react'
import { annuals } from '@/types/MypageTypes'
import RequestedAnnual from '@/components/mypage/RequestedAnnual'
import ApprovedAnnual from '@/components/mypage/ApprovedAnnual'
import MonthRange from '@/components/mypage/MonthRange'
import styles from './MyAnnual.module.scss'

// MyAnnual에서 사용할 props 타입 정의
interface MyAnnualProps {
  annualData: annuals[]
}

// 연차 조회 탭을 출력하는 MyAnnual component
const MyAnnual: React.FC<MyAnnualProps> = ({ annualData }) => {
  const currentDate = new Date()

  // MonthRange에서 선택한 년도와 월을 상태 관리
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1)

  // MonthRange에서 선택한 년도와 월을 업데이트하는 함수
  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  // 선택한 년도와 월에 해당하는 연차 데이터 Filtering
  const filteredData = annualData.filter(
    (annual) =>
      new Date(annual.date).getFullYear() === selectedYear && new Date(annual.date).getMonth() + 1 === selectedMonth
  )

  return (
    <section className={styles.board__container}>
      <MonthRange
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onPrevMonthClick={() => setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1)}
        onNextMonthClick={() => setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1)}
        onMonthChange={handleMonthChange}
      />
      <RequestedAnnual
        annualData={filteredData}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <div style={{ height: '30px' }} />
      <ApprovedAnnual
        annualData={filteredData}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </section>
  )
}

export default MyAnnual
