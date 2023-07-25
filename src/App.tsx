import './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Main from '@/pages/main/Main'
import Mypage from '@/pages/mypage/Mypage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
      </Route>
    </Routes>
  )
}

export default App
