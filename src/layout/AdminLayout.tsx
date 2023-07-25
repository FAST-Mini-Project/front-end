import { Outlet } from 'react-router-dom'
import SideBar from '@/component/SideBar'

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", width:"100%" }}>
      <SideBar />
      <Outlet />
    </div>
  )
}
export default AdminLayout