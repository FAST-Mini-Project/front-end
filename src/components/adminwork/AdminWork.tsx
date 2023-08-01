import React, { useState } from 'react'
import { DateClickInfo } from '@/types/MainTypes'
import { IoIosClose } from 'react-icons/io'
import style from './AdminWork.module.scss'
import { userListData } from '@/types/AdminTypes'

interface Props {
  dateInfo: DateClickInfo
  employees: userListData 
  setShowAdminWork: (showAdminWork: boolean) => void
}

const AdminWork = ({ dateInfo, employees, setShowAdminWork }: Props) => {
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
 
   const assignHandler = () => {
     setSelectedEmployees(['']);
     setShowAdminWork(false);
   };
 
   const modalCloseHandler = () => {
     setShowAdminWork(false);
   };

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
                {employees
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((employee, index) => (
                    <option
                      key={index}
                      value={employee.name + '#' + employee.employeeNumber}
                    >
                      {employee.name + ' (' + employee.employeeNumber + ')'}
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