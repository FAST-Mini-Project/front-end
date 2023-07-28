import { useState } from "react";
import style from "./Admin.module.scss";
import { dummyData } from "@/dummy/DummyData";

const Admin = () => {
  const [data, setData] = useState({
    statusCode: 200,
    data: dummyData});

  const handleDelete = (id) => {
    console.log(`삭제 버튼 클릭: ${id}`)
  }

  return (
    <section className={style.container}>
      <div className={style.contentWrapper}>
        <table className={style.table}>
          <thead>
            <tr className={style.tr}>
              <th className={style.th}>사원명</th>
              <th className={style.th}>이메일</th>
              <th className={style.th}>잔여 연차/당직 근무일 수</th>
              <th className={style.th}>빈칸</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((employee) => (
              <tr key={employee.id} className={style.tr}>
                <td className={style.td}>
                  {employee.name} {employee.employeeNumber}
                </td>
                <td className={style.td}>
                  {employee.email}</td>
                <td className={style.td}>
                  {employee.restAnnual}/{employee.workDay}
                </td>
                <td className={style.td}>
                  <button className={style.delete} onClick={() => handleDelete(employee.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Admin
