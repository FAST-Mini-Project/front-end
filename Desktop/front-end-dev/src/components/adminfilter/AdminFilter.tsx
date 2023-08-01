import { ChangeEvent, useRef, SetStateAction } from "react"
import style from "./AdminFilters.module.scss"

interface AdminFiltersProps {
  search: string;
  setSearch: (value: SetStateAction<string>) => void;
  delayedSearch: string;
  setDelayedSearch: (value: SetStateAction<string>) => void;
  sort: "asc" | "desc";
  setSort: (value: SetStateAction<"asc" | "desc">) => void;
  selectedColumn: "name" | "restAnnual" | "workDay" | "date";
  setSelectedColumn?: (value: SetStateAction<"name" | "restAnnual" | "workDay" | "date">) => void;
  setSelectedColumn1?: (value: SetStateAction<"name" | "restAnnual" | "workDay">) => void;
  setSelectedColumn2?: (value: SetStateAction<"name" | "date">) => void;
  columns: Array<{ value: "name" | "restAnnual" | "workDay" | "date", text: string }>
  name?: string;
}

const AdminFilters = ({
  search,
  setSearch,
  delayedSearch,
  setDelayedSearch,
  sort,
  setSort,
  selectedColumn,
  setSelectedColumn1,
  setSelectedColumn2,
  columns,
  name,
}:AdminFiltersProps) => {
  const searchTimeout = useRef<number | null>(null)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    searchTimeout.current = setTimeout(() => {
      setDelayedSearch(e.target.value)
    }, 150)
  }

  const handleColumnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newColumnValue = e.target.value as "name" | "restAnnual" | "workDay" | "date";
    if (setSelectedColumn1 && ["name", "restAnnual", "workDay"].includes(newColumnValue)) {
      setSelectedColumn1(newColumnValue as "name" | "restAnnual" | "workDay");
    } else if (setSelectedColumn2 && ["name", "date"].includes(newColumnValue)) {
      setSelectedColumn2(newColumnValue as "name" | "date");
    }
  };  

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value as "asc" | "desc")
  }

  return (
    <>
      {/* 검색 창, 정렬 셀렉트 박스 및 라디오 버튼들 */}
      <input
        type="text"
        className={style.searchInput}
        placeholder="사원 검색"
        value={search}
        onChange={handleSearchChange}
      />
      <select className={style.searchInput} onChange={handleColumnChange}>
        {columns.map((col, index) => (
          <option key={index} value={col.value}>{col.text}</option>
        ))}
      </select>
      <label>
        <input
          type="radio"
          name={name}
          value="asc"
          checked={sort === "asc"}
          onChange={handleSortChange}
        />
        오름차순
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value="desc"
          checked={sort === "desc"}
          onChange={handleSortChange}
        />
        내림차순
      </label>
    </>
  )
}

export default AdminFilters
