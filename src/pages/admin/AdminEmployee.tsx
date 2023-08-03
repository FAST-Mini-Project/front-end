import { useState, useEffect } from "react";
import style from "./AdminEmployee.module.scss";
import { getUserListApi } from "@/api/admin";
import PageNation from "@/components/pagenation/PageNation";
import { userInfo } from "@/types/AdminTypes";
import AdminFilters from "@/components/adminfilter/AdminFilter";
import { getCookie } from "@/utils/cookie";

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

const AdminEmployee = () => {
  const [data, setData] = useState<userInfo[]>([]);
  //페이지네이션 변수
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  //검색 변수
  const [search, setSearch] = useState("");
  const [delayedSearch, setDelayedSearch] = useState("");
  //정렬 변수
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [selectedColumn, setSelectedColumn] = useState<"name" | "restAnnual" | "workDay">("name");

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      const response = await getUserListApi(token);
      setData(response.data);
    }
    fetchData();
  }, []);

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
            {/* 검색 입력 및 정렬 옵션 박스, 오름차순/내림차순 라디오 버튼들 */}
            <AdminFilters
              search={search}
              setSearch={setSearch}
              delayedSearch={delayedSearch}
              setDelayedSearch={setDelayedSearch}
              sort={sort}
              setSort={setSort}
              selectedColumn={selectedColumn}
              setSelectedColumn1={setSelectedColumn}
              columns={[
                { value: "name", text: "사원명" },
                { value: "restAnnual", text: "잔여 연차" },
                { value: "workDay", text: "당직 근무일 수" },
              ]}
            />
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
            </tr>
          </thead>
          <tbody>
            {pagenatedData.map((employee: userInfo) => (
              <tr key={employee.id} className={style.tr}>
                <td className={style.td}>
                  {employee.name} #{employee.employeeNumber.slice(0,4)}
                </td>
                <td className={style.td}>{employee.email}</td>
                <td className={style.td}>{employee.restAnnual}</td>
                <td className={style.td}>{employee.workDay}</td>
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

export default AdminEmployee;
