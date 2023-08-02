import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import style from './AdminDuty.module.scss'
import { useState, useEffect, useRef } from 'react'
import { workInfo, DateClickInfo } from '@/types/MainTypes'
import AdminWork from '@/components/adminwork/AdminWork'
import { getWorkApi } from '@/api/main'
import { getUserListApi } from '@/api/admin'
import { userListData } from '@/types/AdminTypes'

interface EventObject {
  title: string
  date: string
  isAnnual: boolean
  backgroundColor?: string
  borderColor?: string
}

const AdminDuty = () => {
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
  const [showAdminWork, setShowAdminWork] = useState(false)
  const [dateClickInfo, setDateClickInfo] = useState<DateClickInfo | null>(null)
  
  // 유저 정보
  const [data, setData] = useState<workInfo>({
    workId: 0,
    name: '',
    employeeNumber: '',
    date: ''
  })
  const [employees, setEmployees] = useState<userListData>([]);

  useEffect(() => {
    async function fetchData() {
      const userList = await getUserListApi("your_token_here");
  
      if (userList) {
        setEmployees(userList);
      } else {
        console.error("Error fetching user list data.");
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    if (selectText === '전체 연차/당직') {
      fetchData()
    } else {
      fetchData().then(() => {
        const filteredEvents = currentEvents.filter((event) =>
          event.title.includes(`${data.name}#${data.employeeNumber.slice(0, 4)}`)
        )
        setCurrentEvents(filteredEvents)
      })
      console.log(currentEvents)
    }
  }, [selectText, year, month])

  // 년/월에 맞춰서 데이터를 가져옴
  const fetchData = async () => {
    const workData = await getWorkApi(year, month);
    console.log(workData)
  
    if (workData) { 
      const workEvents: EventObject[] = [];
  
      workData.forEach((item: any) => {
        workEvents.push({
          title: item.name + '#' + item.employeeNumber.slice(0, 4),
          date: item.date,
          isAnnual: false,
          backgroundColor: '#795c34',
          borderColor: '#795c34',
        });
      });
  
      setCurrentEvents([...workEvents]);
      console.log([...workEvents]);
    } else {
      console.error('Error fetching data.');
    }
  };


  const handleDateClick = (info: DateClickInfo) => {
    setShowAdminWork(true)
    setDateClickInfo(info)
  }

  return (
    <div className={style.container}>
      <div className={style.calendarWrapper}>
        <FullCalendar
          ref={calendarRef}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: '',
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
        {showAdminWork && 
          <AdminWork 
            dateInfo={dateClickInfo as DateClickInfo}
            employees={employees}
            setShowAdminWork={setShowAdminWork}   
          />}
      </div>
    </div>
  )
}

export default AdminDuty
