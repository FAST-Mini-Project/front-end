import style from './AnnualApplyModal.module.scss'
import { DateClickInfo } from '@/types/MainTypes'
import { useState } from 'react'

interface Props {
  dateInfo: DateClickInfo
  setShowModal: (showModal: boolean) => void
}

const AnnaulApplyModal = ({ dateInfo }: Props) => {
  const [dateValue, setDateValue] = useState<string>(dateInfo.dateStr)

  const dateValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value)
  }

  const applyHandler = () => {
    alert('연차 신청이 완료되었습니다! 관리자 승인까지 기다려주세요.')
  }

  return (
    <div className={style.container}>
      <div className={style.modalHeader}>{dateValue}</div>
      <div className={style.applyContent}>
        <span className={style.title}>연차 신청하기</span>
        <input className={style.date} type="date" value={dateValue} onChange={dateValueHandler} />
        <span className={style.des}>해당일자에 연차를 신청하시겠습니까?</span>
        <button className={style.applyBtn} onClick={applyHandler}>
          신청하기
        </button>
      </div>
    </div>
  )
}

export default AnnaulApplyModal
