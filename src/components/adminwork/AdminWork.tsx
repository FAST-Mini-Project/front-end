import { useState } from 'react'
import { DateClickInfo } from '@/types/MainTypes'
import { IoIosClose } from 'react-icons/io'
import style from './AdminWork.module.scss'
import { userListData, workRegistReq } from '@/types/AdminTypes'
import { registWorkApi } from '@/api/admin'
import { getCookie } from '@/utils/cookie'

interface Props {
  dateInfo: DateClickInfo
  employees: userListData 
  setShowAdminWork: (showAdminWork: boolean) => void
  onWorkAssigned: () => void;
}

const AdminWork = ({ dateInfo, employees, setShowAdminWork, onWorkAssigned }: Props) => {
   const [selectedEmployees, setSelectedEmployees] = useState<string[]>(['']);
   const modalHeight = 400 + Math.max(0, selectedEmployees.length - 5) * 25;

   // 선택한 직원을 관리하는 이벤트 핸들러
   const handleEmployeeChange = (
     e: React.ChangeEvent<HTMLSelectElement>,
     index: number,
   ) => {
     const newSelectedEmployees = [...selectedEmployees];
     newSelectedEmployees[index] = e.target.value;
 
     // 마지막 드롭다운에서 선택된 경우 새로운 드롭다운을 추가
     if (index === selectedEmployees.length - 1 && e.target.value) {
       newSelectedEmployees.push('');
     }
 
     setSelectedEmployees(newSelectedEmployees);
   };
 
   const assignHandler = async () => {
    for (const employee of selectedEmployees) {
      // 직원 정보로부터 id를 가져옵니다.
      const foundEmployee = employees.find(e => `${e.name}#${e.employeeNumber.slice(4, 8)}` === employee);

      // id와 날짜 정보를 서버에 전송합니다.
      if (foundEmployee) {
        const data: workRegistReq = {
          id: foundEmployee.id,
          date: dateInfo.dateStr,
        };

        const token = getCookie("token");
        await registWorkApi(token, data);
      }
    }

    setSelectedEmployees(['']);
    setShowAdminWork(false);
    onWorkAssigned && onWorkAssigned();
  };

   const modalCloseHandler = () => setShowAdminWork(false);

  return (
    <>
      <div className={style.container} style={{ height: modalHeight }}>
        <div className={style.modalHeader}>
          <span className={style.title}>{dateInfo.dateStr}</span>
          <div 
            className={style.icon} 
            onClick={modalCloseHandler}>
            <IoIosClose />
          </div>
        </div>

        <div className={style.assignContent}>
          <span className={style.title}>당직 지정하기</span>
          {/* 드롭다운 추가 */}
          <div className={style.dropdownContainer}>
            {selectedEmployees.map((selectedEmployees, i) => (
              <select
                key={i}
                className={style.employeeSelect}
                value={selectedEmployees}
                onChange={(e) => handleEmployeeChange(e, i)}
              >
                {/* 드롭다운 사원 리스트 */}
                <option>-- 사원 선택 --</option>
                {Array.isArray(employees) && employees
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((employee, index) => (
                    <option
                      key={index}
                      value={`${employee.name}#${employee.employeeNumber.slice(0,4)}`}
                    >
                      {`${employee.name} (#${employee.employeeNumber.slice(0,4)})`}

                    </option>
                  ))}
              </select>
            ))}
          </div>
          {/* 메세지 리스트 */}
          <div className={style.assignWrapper}>
            <div className={style.selectedEmployeesList}>
              {selectedEmployees.map((employee, index) => (
                employee && (
                  <div key={index}>
                    {employee} 님을 당직으로 지정하시겠습니까?
                  </div>
                )
              ))}
            </div>

            <button 
              className={style.assignBtn} 
              onClick={assignHandler} 
              disabled={!selectedEmployees}>
              지정하기
            </button>
          </div>
        </div>
      </div>
      <div 
        className={style.background} 
        onClick={modalCloseHandler}>
      </div>
    </>
  )
}

export default AdminWork
