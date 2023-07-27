import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import style from './CalendarForm.module.scss'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { annualData } from '@/types/MainTypes'

interface EventObject {
  title: string
  date: string
}

const CalendarForm = () => {
  const date = new Date()
  const initialYear = date.getFullYear()
  const initialMonth = date.getMonth() + 1
  const [currentEvents, setCurrentEvents] = useState<EventObject[]>([])
  // 캘린더 이전, 다음달 변경 시 년/월 정보
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  // 캘린더 정보
  const calendarRef = useRef<FullCalendar>(null)

  useEffect(() => {
    fetchDummy()
  }, [year, month])

  // 가짜 비동기 함수
  // 년/월에 맞춰서 데이터를 가져온다고 가정
  const fetchDummy = async () => {
    try {
      const { data } = await axios.get(`/DummyAllAnnual${year}${month}.json`)
      const resData: annualData = data.data
      // 이벤트 생성
      const events = []
      for (const [day, data] of Object.entries(resData)) {
        for (const item of data) {
          events.push({
            title: item.name + '#' + item.employeeNumber.slice(0, 3),
            date: new Date(year, month - 1, Number(day)).toISOString().split('T')[0]
          })
        }
      }
      setCurrentEvents(events)
      console.log(events)
    } catch (error) {
      console.log('해당 년/월에 데이터가 없습니다.')
    }
  }

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'today prev next'
        }}
        editable={true}
        selectable={true}
        // select={handleDateSelect}
        selectMirror={false}
        events={currentEvents}
        locale="ko"
        customButtons={{
          prev: {
            icon: 'chevron-left',
            // split의 타입에러를 수정하기
            click: () => {
              if (calendarRef.current?.getApi()) {
                calendarRef.current.getApi().prev()
                const calendarMonth: string = calendarRef.current.getApi().view.title
                setYear(Number(calendarMonth.split('년')[0]))
                setMonth(Number(calendarMonth.split('년')[1].split('월')[0]))
              }
            }
          },
          next: {
            icon: 'chevron-right',
            click: () => {
              if (calendarRef.current?.getApi()) {
                calendarRef.current.getApi().next()
                const calendarMonth: string = calendarRef.current.getApi().view.title
                setYear(Number(calendarMonth.split('년')[0]))
                setMonth(Number(calendarMonth.split('년')[1].split('월')[0]))
              }
            }
          }
        }}
      />
    </>
  )
}

export default CalendarForm
