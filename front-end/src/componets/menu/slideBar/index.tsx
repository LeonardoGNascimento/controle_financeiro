import {
  BsFillCarFrontFill,
  BsFillPeopleFill,
  BsGear,
  BsReverseLayoutTextWindowReverse,
  BsX,
} from "react-icons/bs";
import {
  Menu,
  MenuItem,
  Sidebar as ReactProSideBar,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FinanceiroItem, ServicoItem, UsuarioItem } from "./item/container";

interface Props {
  colapsed: boolean;
  logout(): void;
}

export function SideBar({ colapsed, logout }: Props) {
  return (
    <ReactProSideBar collapsed={colapsed} className="h-screen">
      <Menu>
        <MenuItem
          component={<Link to="/home" />}
          icon={<BsReverseLayoutTextWindowReverse />}
        >
          Dashboard
        </MenuItem>
        <SubMenu label="Serviço" icon={<BsFillCarFrontFill />}>
          <ServicoItem />
        </SubMenu>
        <SubMenu label="Usuario" icon={<BsFillPeopleFill />}>
          <UsuarioItem />
        </SubMenu>
        <SubMenu label="Configuração" icon={<BsGear />}>
          <FinanceiroItem />
        </SubMenu>
        <MenuItem onClick={logout} icon={<BsX />}>
          Sair
        </MenuItem>
      </Menu>
    </ReactProSideBar>
  );
}
