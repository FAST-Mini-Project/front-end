import './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Main from './pages/main/Main'
import MyPage from './pages/mypage/Mypage'
import AdminEmployee from './pages/admin/AdminEmployee'
import AdminDuty from './pages/admin/AdminDuty'
import AdminAnnual from './pages/admin/AdminAnnual'
import AdminLayout from './layout/AdminLayout'
import LogIn from './pages/login/LogIn'
import SignUp from './pages/login/SignUp'

function App() {
  return (
    <Routes>
      {/* 일반 유저 페이지 */}
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/mypage/*" element={<MyPage />} />
      </Route>
      {/* 관리자 페이지  */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/employee" element={<AdminEmployee />} />
        <Route path="/admin/duty" element={<AdminDuty />} />
        <Route path="/admin/annual" element={<AdminAnnual />} />
      </Route>
    </Routes>
  )
}

export default App
