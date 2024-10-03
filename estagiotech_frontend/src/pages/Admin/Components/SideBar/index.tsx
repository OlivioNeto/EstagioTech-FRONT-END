import style from "./SideBar.module.css";
import LogoImg from "../../../../assets/images/LOGO.svg";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolIcon from '@mui/icons-material/School';

const SideBar = () => {
  return (
    <nav className={style.container}>
      <div className={style.image}>
        <img src={LogoImg} alt="Logo" />
      </div>
      <hr style={{ margin: "20px 0px", borderColor: "#C7C7C7" }} />
      <ul className={style.sidebar}>
        <li className={style.navHeader}>
          <span>Geral</span>
        </li>

        <li>
          <NavLink to="/adm/dashboard">
            <DashboardIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/adm/coordenadorestagio">
            <ManageAccountsIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Coordenador Estágio</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/adm/instituicaoensino">
            <SchoolIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Instituicao Ensino</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
