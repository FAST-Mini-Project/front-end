import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import style from './CalendarForm.module.scss'
import { useState, useEffect, useRef } from 'react'
import DummyAllAnnual7 from './DummyAllAnnual7.json'
import DummyAllAnnual8 from './DummyAllAnnual8.json'
import _ from 'lodash'

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
    const events = []
    const month = 7 // assuming July
    for (const [day, data] of Object.entries(DummyAllAnnual7.data)) {
      for (const item of data) {
        events.push({
          title: item.name + '#' + item.employeeNumber.slice(0, 3),
          date: new Date(2023, month - 1, Number(day)).toISOString().split('T')[0]
        })
      }
    }
    setCurrentEvents(events)
    console.log(events)
  }, [])

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
            click: () => {
              if (calendarRef.current?.getApi()) {
                calendarRef.current.getApi().prev()
                const calendarMonth = _.get
              }
            }
          }
        }}
      />
    </>
  )
}

export default CalendarForm
