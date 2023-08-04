import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '@/components/sidebar/SideBar';
import { getAuthAdminApi } from '@/api/admin';
import { getCookie, removeCookie } from '@/utils/cookie';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      const token = getCookie("token");
      
      try {
        const res = await getAuthAdminApi(token);
        if (res?.status === 200) {
          if (location.pathname === '/admin') {
            navigate('/admin/employee');
          }
          
        } else {
          removeCookie('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      } catch (error) {
        console.error('관리자 권한 체크 오류', error);
      }
    };

    checkAdminAuth();
  }, [navigate]);

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
