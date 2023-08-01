import React from 'react'
// import type { DatePickerProps } from 'antd'
import { DatePicker, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import locale from 'antd/locale/ko_KR'
import styles from './MonthPicker.module.scss'

// MonthPicker에서 사용하는 dayjs 라이브러리 한글화
dayjs.locale('ko')

const MonthPicker: React.FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <DatePicker
        size="large"
        picker="month"
        placeholder={'조회할 기간 선택'}
        format="YYYY년 MM월"
        className={styles.month__picker}
      />
    </ConfigProvider>
  )
}

export default MonthPicker
