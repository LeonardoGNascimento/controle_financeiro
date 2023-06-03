import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { ServicoItem, UsuarioItem } from "./item/container";
import {
  BsFillCarFrontFill,
  BsFillPeopleFill,
  BsReverseLayoutTextWindowReverse,
  BsX,
} from "react-icons/bs";

interface Props {
  colapsed: boolean;
  logout: any;
}

export function SlideBar({ colapsed, logout }: Props) {
  return (
    <Sidebar collapsed={colapsed} className="h-screen">
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
        <MenuItem onClick={logout} icon={<BsX />}>
          Sair
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
