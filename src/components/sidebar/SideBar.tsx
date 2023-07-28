import { NavLink } from "react-router-dom";
import style from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <NavLink
        to="/admin/employee"
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        사원 관리
      </NavLink>
      <NavLink
        to="/admin/duty"
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        당직 관리
      </NavLink>
      <NavLink
        to="/admin/annual"
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        연차 관리
      </NavLink>
    </div>
  );
};

export default SideBar;
