import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import style from './CalendarForm.module.scss'
import { useState, useEffect } from 'react'
import DummyAllAnnual from './DummyAllAnnual.json'

interface EventObject {
  title: string
  date: string
}

const CalendarForm = () => {
  const [currentEvents, setCurrentEvents] = useState<EventObject[]>([])

  useEffect(() => {
    const events = []
    const month = 7 // assuming July
    for (const [day, data] of Object.entries(DummyAllAnnual.data)) {
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
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title'
        }}
        editable={true}
        selectable={true}
        // select={handleDateSelect}
        selectMirror={false}
        events={currentEvents}
        locale="ko"
      />
    </>
  )
}

export default CalendarForm
