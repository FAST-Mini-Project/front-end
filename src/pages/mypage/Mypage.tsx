import { useEffect, useState } from 'react'
import { annuals, works } from '@/types/MypageTypes'
import axios from 'axios'
import MyAnnual from '@/pages/mypage/MyAnnual'
import MyDuty from '@/pages/mypage/MyDuty'
import MyInfo from '@/pages/mypage/MyInfo'
import MenuTab from '@/components/mypage/MenuTab'
import styles from './MyPage.module.scss'

// MyPage Component
const MyPage: React.FC = () => {
  // MyPage 상단의 MenuTab 전환으로 메뉴 이동
  // 마이 페이지 렌더링 시 '연차 조회'탭이 default로 활성화됨
  const [activeTab, setActiveTab] = useState<'annual' | 'duty' | 'info'>('annual')

  // 연차 관련 데이터 저장
  const [annualData, setAnnualData] = useState<annuals[]>([])

  // 당직 관련 데이터 저장
  const [dutyData, setDutyData] = useState<works[]>([])

  // MenuTab 클릭 시 Tab 전환
  const handleTabClick = (tab: 'annual' | 'duty' | 'info') => {
    setActiveTab(tab)
  }

  useEffect(() => {
    const fetchDummy = async () => {
      try {
        // Dummy 데이터로 연차 데이터 axios 호출 및 출력
        const { data: annualData } = await axios.get('/DummyFetchAnnual.json')
        const dummyAnnualData: annuals[] = annualData.data
        setAnnualData(dummyAnnualData)

        // Dummy 데이터로 당직 데이터 axios 호출 및 출력
        const { data: dutyData } = await axios.get('/DummyFetchDuty.json')
        const dummyDutyData: works[] = dutyData.data
        setDutyData(dummyDutyData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDummy()
  }, [])

  return (
    <div className={styles.container}>
      {/* 활성화된 Tab에 따라 해당 컴포넌트 렌더링 */}
      <MenuTab activeTab={activeTab} handleTabClick={handleTabClick} annualData={annualData} />
      {activeTab === 'annual' && <MyAnnual annualData={annualData} />}
      {activeTab === 'duty' && <MyDuty dutyData={dutyData} />}
      {activeTab === 'info' && <MyInfo />}
    </div>
  )
}

export default MyPage
