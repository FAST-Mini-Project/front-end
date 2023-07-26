import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg, EventClickArg, EventContentArg, EventApi } from '@fullcalendar/core'
import style from './CalendarForm.module.scss'
import { useState, useEffect } from 'react'
import DummyAllAnnual from './DummyAllAnnual.json'
import { createEventId } from '@/utils/CalendarUtils'

const CalendarForm = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo)
    const title = prompt('연차를 등록해주세요: 이름') // 차후 유저 구현 시 이름으로 대체
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(), // annualId로 대체
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <i>{eventContent.event.title}</i>
      </>
    )
  }

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events)
    console.log('handleEvents', events)
  }
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
        select={handleDateSelect}
        selectMirror={false}
        eventContent={renderEventContent}
        eventsSet={handleEvents}
      />
    </>
  )
}

export default CalendarForm
