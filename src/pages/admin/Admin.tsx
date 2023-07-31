import { useState, useRef } from "react";
import style from "./Admin.module.scss";
import { dummyData } from "@/dummy/DummyData";
import PageNation from "@/components/pagenation/PageNation";
import { userInfo } from "@/types/AdminTypes";

// 페이지네이션 함수
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
  const [data] = useState(dummyData);
  //페이지네이션 변수
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  //검색 변수
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<number | null>(null);
  const [delayedSearch, setDelayedSearch] = useState("");
  //정렬 변수
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [selectedColumn, setSelectedColumn] = useState<"name" | "restAnnual" | "workDay">("name");

  // 정렬할 열을 변경
  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value as "name" | "restAnnual" | "workDay");
  };

  // 오름차순, 내림차순 변경
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value as "asc" | "desc");
  };

  // 삭제 버튼 처리
  const handleDelete = (id) => {
    console.log(`삭제 버튼 클릭: ${id}`);
  };

  // 검색 이벤트 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // 딜레이 생성
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      setDelayedSearch(e.target.value);
      setCurrentPage(1);
    }, 150);
  };

  // 이름으로 필터링된 데이터 반환
  const filteredData = data.filter((employee) =>
    employee.name.toLowerCase().includes(delayedSearch.toLowerCase())
  );

  // 정렬된 데이터 반환
  const sortedData = filteredData.sort((a, b) => {
    if (sort === "asc") {
      return a[selectedColumn] > b[selectedColumn] ? 1 : -1;
    } else {
      return a[selectedColumn] < b[selectedColumn] ? 1 : -1;
    }
  });  

  // 현재 페이지에 대한 페이징 처리된 데이터 반환
  const pagenatedData = getPaginatedItems(
    sortedData,
    currentPage,
    itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <section className={style.container}>
      <div className={style.contentWrapper}>
      <div className={style.caption}>
        <h2 className={style.h2}>사원 목록</h2>
          <div>
            <input
              type="text"
              className={style.searchInput}
              placeholder="사원 검색"
              value={search}
              onChange={handleSearchChange}
            />
          {/* 정렬 옵션, 오름차순/내림차순 라디오 버튼들 */}
            <select className={style.searchInput} onChange={handleColumnChange}>
              <option value="name">사원명</option>
              <option value="restAnnual">잔여 연차</option>
              <option value="workDay">당직 근무일 수</option>
            </select>

            <label>
              <input
                type="radio"
                name="sort"
                value="asc"
                checked={sort === "asc"}
                onChange={handleSortChange}
              />
              오름차순
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="desc"
                checked={sort === "desc"}
                onChange={handleSortChange}
              />
              내림차순
            </label>
          </div>
        </div>
        {/* 표 작성 및 데이터 매핑 */}
        <table className={style.table}>
          <thead>
            <tr className={style.tr}>
              <th className={style.th}>사원명</th>
              <th className={style.th}>이메일</th>
              <th className={style.th}>잔여 연차</th>
              <th className={style.th}>당직 근무일 수</th>
              <th className={style.th}>빈칸</th>
            </tr>
          </thead>
          <tbody>
            {pagenatedData.map((employee: userInfo) => (
              <tr key={employee.id} className={style.tr}>
                <td className={style.td}>
                  {employee.name} {employee.employeeNumber}
                </td>
                <td className={style.td}>{employee.email}</td>
                <td className={style.td}>{employee.restAnnual}</td>
                <td className={style.td}>{employee.workDay}</td>
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
        {/* 검색 입력 및 페이지네이션 컴포넌트 */}
        <PageNation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

export default Admin;
