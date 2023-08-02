import style from './AdminAnnual.module.scss'
import { dummyData2 } from '@/dummy/DummyData'
import { useState } from 'react'
import AdminFilters from '@/components/adminfilter/AdminFilter'

type Data = {
  data: {
    annualId: number
    name: string
    employeeNumber: string
    date: string
    status: string
  }[]
}

const AdminAnnual = () => {
  const [data, setData] = useState<Data>({
    data: dummyData2.data
  })
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [delayedSearch1, setDelayedSearch1] = useState("");
  const [delayedSearch2, setDelayedSearch2] = useState("");
  const [sort1, setSort1] = useState<"asc" | "desc">("asc");
  const [sort2, setSort2] = useState<"asc" | "desc">("asc");
  const [selectedColumn1, setSelectedColumn1] = useState<"name" | "date">("name");
  const [selectedColumn2, setSelectedColumn2] = useState<"name" | "date">("name");

  const handleApprove = (annualId) => {
    console.log(`승인 버튼 클릭: ${annualId}`)
  }

  const handleReject = (annualId) => {
    console.log(`거부 버튼 클릭: ${annualId}`)
  }

  const filteredData1 = data.data
    .filter((item) => item.status === "UNAPPROVED")
    .filter((employee) => employee.name.toLowerCase().includes(delayedSearch1.toLowerCase()));

  const filteredData2 = data.data
    .filter((item) => item.status === "CANCELED")
    .filter((employee) => employee.name.toLowerCase().includes(delayedSearch2.toLowerCase()));

  const sortedData1 = filteredData1.sort((a, b) => {
    if (sort1 === "asc") {
      return a[selectedColumn1] > b[selectedColumn1] ? 1 : -1;
    } else {
      return a[selectedColumn1] < b[selectedColumn1] ? 1 : -1;
    }
  });

  const sortedData2 = filteredData2.sort((a, b) => {
    if (sort2 === "asc") {
      return a[selectedColumn2] > b[selectedColumn2] ? 1 : -1;
    } else {
      return a[selectedColumn2] < b[selectedColumn2] ? 1 : -1;
    }
  });

  return (
    <section className={style.container}>
      <div className={style.contentWrapper}>
        <div className={style.caption}>
          <h2 className={style.h2}>연차 신청 목록</h2>
          <div>
          {/* 검색 입력 및 정렬 옵션 박스, 오름차순/내림차순 라디오 버튼들 */}
          <AdminFilters 
            name="sort1"
            search={search1}
            setSearch={setSearch1}
            delayedSearch={delayedSearch1}
            setDelayedSearch={setDelayedSearch1}
            sort={sort1}
            setSort={setSort1}
            selectedColumn={selectedColumn1}
            setSelectedColumn2={setSelectedColumn1}
            columns={[
              { value: "name", text: "사원명" },
              { value: "date", text: "신청 날짜" },
            ]}
          />
          </div>
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>사원명</th>
                <th className={style.th}>신청 날짜</th>
                <th className={style.th}>승인/거부</th>
              </tr>
            </thead>
            <tbody>
              {sortedData1.map((employee) => (
                <tr key={employee.annualId} className={style.tr}>
                  <td className={style.td}>
                    {employee.name} {employee.employeeNumber}
                  </td>
                  <td className={style.td}>{employee.date}</td>
                  <td className={style.td}>
                    <button className={style.approve} onClick={() => handleApprove(employee.annualId)}>
                      승인
                    </button>
                    <button className={style.delete} onClick={() => handleReject(employee.annualId)}>
                      거부
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={style.caption}>
          <h2 className={style.h2}>취소 신청 목록</h2>
          <div>
          <AdminFilters
            name="sort2"
            search={search2}
            setSearch={setSearch2}
            delayedSearch={delayedSearch2}
            setDelayedSearch={setDelayedSearch2}
            sort={sort2}
            setSort={setSort2}
            selectedColumn={selectedColumn2}
            setSelectedColumn2={setSelectedColumn2}
            columns={[
              { value: "name", text: "사원명" },
              { value: "date", text: "신청 날짜" },
            ]}
          />
          </div>
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>사원명</th>
                <th className={style.th}>신청 날짜</th>
                <th className={style.th}>승인/거부</th>
              </tr>
            </thead>
            <tbody>
              {sortedData2.map((employee) => (
                <tr key={employee.annualId}>
                  <td className={style.td}>
                    {employee.name} {employee.employeeNumber}
                  </td>
                  <td className={style.td}>{employee.date}</td>
                  <td className={style.td}>
                    <button className={style.approve} onClick={() => handleApprove(employee.annualId)}>
                      승인
                    </button>
                    <button className={style.delete} onClick={() => handleReject(employee.annualId)}>
                      거부
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminAnnual
