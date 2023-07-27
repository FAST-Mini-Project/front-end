import { Outlet } from 'react-router-dom'
import MainHeader from '@/components/common/MainHeader'
import MainFooter from '@/components/common/MainFooter'
import style from './MainLayout.module.scss'

const MainLayout = () => {
  return (
    <div>
      <MainHeader />
      <main className={style.main}>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}
export default MainLayout
