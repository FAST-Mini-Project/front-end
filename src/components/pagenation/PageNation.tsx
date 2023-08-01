import style from "./PageNation.module.scss";
import { Dispatch, SetStateAction } from "react";

interface PageNationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const PageNation = ({ currentPage, setCurrentPage, totalPages }: PageNationProps) => {
  // 이전 페이지로 이동
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={style.pagination}>
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        이전
      </button>
      <span className={style.paginationInfo}>
        페이지 {currentPage} / {totalPages}
      </span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
};

export default PageNation;
