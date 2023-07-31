import { useState,useRef } from "react";
import style from "./Admin.module.scss";
import { dummyData } from "@/dummy/DummyData";
import PageNation from "@/components/pagenation/PageNation";
import { userInfo } from "@/types/AdminTypes";

const getPaginatedItems = (
  items: userInfo[],
  currentPage: number,
  itemsPerPage: number,
): userInfo[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

const Admin = () => {
  const [data, setData] = useState(dummyData);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<number | null>(null);
  const [delayedSearch, setDelayedSearch] = useState("");

  const handleDelete = (id) => {
    console.log(`삭제 버튼 클릭: ${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      setDelayedSearch(e.target.value);
      setCurrentPage(1); 
    }, 150);
  };

  const filteredData = data.filter((employee) =>
  employee.name.toLowerCase().includes(delayedSearch.toLowerCase())
);

  const pagenatedData = getPaginatedItems(
    filteredData,
    currentPage,
    itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
            {pagenatedData.map(
              (employee:userInfo) => (
              <tr key={employee.id} className={style.tr}>
                <td className={style.td}>
                  {employee.name} {employee.employeeNumber}
                </td>
                <td className={style.td}>{employee.email}</td>
                <td className={style.td}>
                  {employee.restAnnual}/{employee.workDay}
                </td>
                <td className={style.td}>
                  <button
                    className={style.delete}
                    onClick={() => handleDelete(employee.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={style.searchPaginationWrapper}>
          <input
            type="text"
            className={style.searchInput}
            placeholder="사원 검색"
            value={search}
            onChange={handleSearchChange}
          />
          <PageNation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
      </div>
      </div>
    </section>
  )
}

export default Admin
