import './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Main from './pages/main/Main'
import MyPage from './pages/mypage/Mypage'
import Admin from './pages/admin/Admin'
import AdminDuty from './pages/admin/AdminDuty'
import AdminAnnual from './pages/admin/AdminAnnual'
import AdminLayout from './layout/AdminLayout'
import LogIn from './pages/login/LogIn'
import SignUp from './pages/login/SignUp'

import { UserPrivateRoute, AdminPrivateRoute } from './utils/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<UserPrivateRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage/*" element={<MyPage />} />
        </Route>
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/employee" element={<Admin />} />
          <Route path="/admin/duty" element={<AdminDuty />} />
          <Route path="/admin/annual" element={<AdminAnnual />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
