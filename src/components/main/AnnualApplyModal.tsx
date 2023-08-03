import style from './AnnualApplyModal.module.scss'
import { DateClickInfo } from '@/types/MainTypes'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { getCookie } from '@/utils/cookie'
import { annualApplyApi } from '@/api/main'

interface Props {
  dateInfo: DateClickInfo
  setShowModal: (showModal: boolean) => void
}

const AnnaulApplyModal = ({ dateInfo, setShowModal }: Props) => {
  const [dateValue, setDateValue] = useState<string>(dateInfo.dateStr)

  const dateValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value)
    console.log(e.target.value)
  }

  const applyHandler = async () => {
    await annualApplyApi(getCookie('token'), { date: dateValue }).then((res) => {
      if (Array.isArray(res)) {
        alert('연차 신청에 실패했습니다.')
      } else {
        alert('연차 신청이 완료되었습니다! 관리자 승인 후 반영됩니다. 마이페이지에서 확인해주세요.')
      }
    })

    setShowModal(false)
  }

  const modalCloseHandler = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.modalHeader}>
          <span className={style.title}>{dateValue}</span>
          <div className={style.icon} onClick={modalCloseHandler}>
            <IoIosClose />
          </div>
        </div>
        <div className={style.applyContent}>
          <span className={style.title}>연차 신청하기</span>
          <input className={style.date} type="date" value={dateValue} onChange={dateValueHandler} />
          <div className={style.applyWrapper}>
            <div className={style.des}>해당일자에 연차를 신청하시겠습니까?</div>
            <button className={style.applyBtn} onClick={applyHandler}>
              신청하기
            </button>
          </div>
        </div>
      </div>
      <div className={style.background} onClick={modalCloseHandler}></div>
    </>
  )
}

export default AnnaulApplyModal
