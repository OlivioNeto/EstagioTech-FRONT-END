import style from "./SideBar.module.css";
import LogoImg from "../../../../assets/images/LOGO.svg";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const SideBarAL = () => {
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
          <NavLink to="/aluno/dashboard">
            <DashboardIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/aluno/coordenadorestagio">
            <ManageAccountsIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Coordenador Estágio</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/aluno/documento">
            <AssignmentIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Documento</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/aluno/documentonecessario/cadastro">
            <DocumentScannerIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Documento Necessário</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/aluno/tipodocumento">
            <FindInPageIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Tipo Documento</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/aluno/tipoestagio">
            <AssignmentIndIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Tipo Estágio</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBarAL;
