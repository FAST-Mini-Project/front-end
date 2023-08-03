//fullCalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
//style
import style from './CalendarForm.module.scss'
//react
import { useState, useEffect, useRef } from 'react'
//axios
import axios from 'axios'
// types
import { DateClickInfo } from '@/types/MainTypes'
import { User } from '@/types/AccessTypes' // 임시
//components
import AnnualApplyModal from '@/components/main/AnnualApplyModal'
//api fetch
import { getAnnualApi, getWorkApi } from '@/api/main'

interface EventObject {
  title: string
  date: string
  isAnnual: boolean
  backgroundColor?: string
  borderColor?: string
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
  // 캘린더 헤더 툴바 버튼
  const [selectText, setSelectText] = useState<string>('전체 연차/당직')
  // 연차 신청 팝업 열기
  const [showModal, setShowModal] = useState(false)
  const [dateClickInfo, setDateClickInfo] = useState<DateClickInfo | null>(null)

  // 유저 정보(임시)
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    employeeNumber: '',
    role: 'ROLE_USER'
  })

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

  useEffect(() => {
    getEvents()
  }, [selectText, year, month])

  // 진짜 api함수
  const getEvents = async () => {
    const annualData = await getAnnualApi(year, month)
    const workData = await getWorkApi(year, month)
    const annualEvents: EventObject[] = []
    const workEvents: EventObject[] = []
    // 연차 events push
    if (annualData) {
      annualData.forEach((item) => {
        annualEvents.push({
          title: item.name + '#' + item.employeeNumber.slice(0, 3),
          date: item.date,
          isAnnual: true
        })
      })
    }
    // 당직 events push
    if (workData) {
      workData.forEach((item) => {
        workEvents.push({
          title: item.name + item.employeeNumber.slice(0, 3),
          date: item.date,
          isAnnual: false,
          backgroundColor: '#795c34',
          borderColor: '#795c34'
        })
      })
    }
    if (selectText === '전체 연차/당직') {
      setCurrentEvents([...annualEvents, ...workEvents])
    } else {
      const filteredEvents = [...annualEvents, ...workEvents].filter((event) =>
        event.title.includes(`${user.name}#${user.employeeNumber}`)
      )
      setCurrentEvents(filteredEvents)
    }
  }

  const handleDateClick = (info: DateClickInfo) => {
    setShowModal(true)
    setDateClickInfo(info)
  }

  const selectHandler = () => {
    setSelectText(selectText === '전체 연차/당직' ? '내 연차/당직' : '전체 연차/당직')
  }

  return (
    <>
      <div className={style.calendarWrapper}>
        <FullCalendar
          ref={calendarRef}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: 'today select',
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
            },
            select: {
              text: selectText,
              click: selectHandler
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
          height="100%"
          dayMaxEvents={true}
        />
        {showModal && <AnnualApplyModal dateInfo={dateClickInfo as DateClickInfo} setShowModal={setShowModal} />}
      </div>
    </>
  )
}

export default CalendarForm
