import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import style from './CalendarForm.module.scss'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { annualData, workData, DateClickInfo } from '@/types/MainTypes'
import AnnualApplyModal from '@/components/main/AnnualApplyModal'

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
  // 연차 신청 팝업 열기
  const [showModal, setShowModal] = useState(false)
  const [dateClickInfo, setDateClickInfo] = useState<DateClickInfo | null>(null)

  useEffect(() => {
    fetchDummy()
  }, [year, month])

  // 가짜 비동기 함수
  // 년/월에 맞춰서 데이터를 가져온다고 가정
  const fetchDummy = async () => {
    let resAnnualData: annualData = {}
    let resWorkData: workData = {}
    try {
      const { data: annualData } = await axios.get(`/DummyAllAnnual${year}${month}.json`)
      resAnnualData = annualData.data
    } catch (error) {
      console.log('연차 데이터 없음', error)
    }

    try {
      const { data: workData } = await axios.get(`/DummyAllWork${year}${month}.json`)
      resWorkData = workData.data
    } catch (error) {
      console.error('당직데이터 없음', error)
    }

    // 이벤트 생성
    const annualEvents = []
    for (const [day, data] of Object.entries(resAnnualData)) {
      for (const item of data) {
        annualEvents.push({
          title: item.name + '#' + item.employeeNumber.slice(0, 3),
          date: new Date(year, month - 1, Number(day)).toISOString().split('T')[0],
          isAnnual: true
        })
      }
    }
    const workEvents = []
    for (const [day, data] of Object.entries(resWorkData)) {
      for (const item of data) {
        workEvents.push({
          title: item.name + '#' + item.employeeNumber.slice(0, 3),
          date: new Date(year, month - 1, Number(day)).toISOString().split('T')[0],
          isAnnual: false,
          backgroundColor: '#795c34',
          borderColor: '#795c34'
        })
      }
    }
    setCurrentEvents([...annualEvents, ...workEvents])
    console.log([...annualEvents, ...workEvents])
  }

  const handleDateClick = (info: DateClickInfo) => {
    setShowModal(true)
    setDateClickInfo(info)
  }

  return (
    <>
      <div className={style.calendarWrapper}>
        <FullCalendar
          ref={calendarRef}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: 'today',
            center: 'title',
            end: 'prev next'
          }}
          editable={false}
          selectable={true}
          dateClick={handleDateClick}
          dragScroll={false}
          events={currentEvents}
          eventDurationEditable={false}
          locale="ko"
          customButtons={{
            prev: {
              icon: 'chevron-left',
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
          eventOrder={(a: any, b: any) => {
            if (a.extendedProps.isAnnual && !b.extendedProps.isAnnual) {
              return -1
            } else if (!a.extendedProps?.isAnnual && b.extendedProps.isAnnual) {
              return 1
            } else {
              return 0
            }
          }}
          height="inherit"
          dayMaxEvents={true}
        />
        {showModal && <AnnualApplyModal dateInfo={dateClickInfo as DateClickInfo} setShowModal={setShowModal} />}
      </div>
    </>
  )
}

export default CalendarForm
