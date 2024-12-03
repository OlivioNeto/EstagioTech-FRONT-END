import style from "./NavBar.module.css";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/UserNav";

const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <h1>Dashboard</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input placeholder="Pesquisar" style={{ height: "30px" }} />

        <NotificationsIcon style={{ marginLeft: "20px" }} />

          <UserNav/>
          
      </div>
    </div>
  );
};

export default Navbar;
