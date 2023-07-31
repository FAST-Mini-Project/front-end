import style from './AdminAnnual.module.scss'
import { dummyData2 } from '@/dummy/DummyData'
import { useState, useRef } from 'react'

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
  const searchTimeout1 = useRef<number | null>(null);
  const searchTimeout2 = useRef<number | null>(null);
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

  const handleSearchChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch1(e.target.value);
    if (searchTimeout1.current) {
      clearTimeout(searchTimeout1.current);
    }

    searchTimeout1.current = setTimeout(() => {
      setDelayedSearch1(e.target.value);
    }, 150);
  };

  const handleSearchChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch2(e.target.value);
    if (searchTimeout2.current) {
      clearTimeout(searchTimeout2.current);
    }

    searchTimeout2.current = setTimeout(() => {
      setDelayedSearch2(e.target.value);
    }, 150);
  };

  const filteredData1 = data.data
    .filter((item) => item.status === "UNAPPROVED")
    .filter((employee) => employee.name.toLowerCase().includes(delayedSearch1.toLowerCase()));

  const filteredData2 = data.data
    .filter((item) => item.status === "CANCELED")
    .filter((employee) => employee.name.toLowerCase().includes(delayedSearch2.toLowerCase()));

  const handleColumnChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn1(e.target.value as "name" | "date");
  };

  const handleColumnChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn2(e.target.value as "name" | "date");
  };

  const handleSortChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSort1(value === "desc" ? "desc" : "asc");
  };

  const handleSortChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSort2(value === "desc" ? "desc" : "asc");
  };

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
            <input
              type="text"
              className={style.searchInput}
              placeholder="사원 검색"
              value={search1}
              onChange={handleSearchChange1}
            />
            <select
              className={style.searchInput}
              onChange={handleColumnChange1}
            >
              <option value="name">사원명</option>
              <option value="date">신청 날짜</option>
            </select>
            <label>
              <input
                type="radio"
                value="asc"
                checked={sort1 === "asc"}
                onChange={handleSortChange1}
              />
              오름차순
            </label>
            <label>
              <input
                type="radio"
                value="desc"
                checked={sort1 === "desc"}
                onChange={handleSortChange1}
              />
              내림차순
            </label>
          </div>
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
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
            <input
              type="text"
              className={style.searchInput}
              placeholder="사원 검색"
              value={search2}
              onChange={handleSearchChange2}
            />
            <select
              className={style.searchInput}
              onChange={handleColumnChange2}
            >
              <option value="name">사원명</option>
              <option value="date">신청 날짜</option>
            </select>
            <label>
              <input
                type="radio"
                value="asc"
                checked={sort2 === "asc"}
                onChange={handleSortChange2}
              />
              오름차순
            </label>
            <label>
              <input
                type="radio"
                value="desc"
                checked={sort2 === "desc"}
                onChange={handleSortChange2}
              />
              내림차순
            </label>
          </div>
        </div>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
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
