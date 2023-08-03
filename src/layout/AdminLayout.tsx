import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '@/components/sidebar/SideBar';

const AdminLayout = () => {
  const navigate = useNavigate();

  // admin으로 입력해도 사원 조회 페이지로
  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/employee');
    }
  }, [navigate, location]);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <SideBar />
      <div style={{  width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;