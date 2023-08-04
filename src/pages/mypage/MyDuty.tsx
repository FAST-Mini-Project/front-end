import { useState } from 'react'
import { works } from '@/types/MypageTypes'
import PlannedDutyList from '@/components/mypage/PlannedDutyList'
import CompletedDutyList from '@/components/mypage/CompletedDutyList'
import MonthRange from '@/components/mypage/MonthRange'
import styles from './MyDuty.module.scss'

// MyDuty에서 사용할 props 타입 정의
interface MyDutyProps {
  dutyData: works[]
}

// 당직 조회 탭을 출력하는 MyDuty component
const MyDuty: React.FC<MyDutyProps> = ({ dutyData }) => {
  // MonthRange에서 선택한 년도와 월을 상태 관리
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)

  // 선택한 년도와 월을 업데이트하는 함수
  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  // 선택한 년도와 월에 해당하는 당직 데이터 Filtering
  const filteredData = dutyData.filter(
    (annual) =>
      new Date(annual.date).getFullYear() === selectedYear && new Date(annual.date).getMonth() + 1 === selectedMonth
  )

  // 현재 날짜 조회
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0) // 오늘 날짜 시작 시간 설정

  // 내일 날짜 조회
  const tomorrowDate = new Date(currentDate)
  tomorrowDate.setDate(tomorrowDate.getDate() + 1) // 내일 날짜 시작 시간 설정

  // 예정된 당직 일정, 완료된 당직 일정 분리
  const plannedDuties = filteredData.filter((duty) => {
    // 현재 날짜보다 이후인 경우 '예정된 당직 일정'
    const dutyDate = new Date(duty.date)
    // 오늘 날짜까지는 '예정된 당직 일정'으로 분리
    return dutyDate >= currentDate
  })

  const completedDuties = filteredData.filter((duty) => {
    // 현재 날짜보다 이전인 경우 '완료된 당직 일정'
    const dutyDate = new Date(duty.date)
    return dutyDate < currentDate
  })

  return (
    <section className={styles.board__container}>
      <MonthRange
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onPrevMonthClick={() => setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1)}
        onNextMonthClick={() => setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1)}
        onMonthChange={handleMonthChange}
      />
      <PlannedDutyList
        dutyData={plannedDuties}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <div style={{ height: '30px' }} />
      <CompletedDutyList
        dutyData={completedDuties}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </section>
  )
}

export default MyDuty
