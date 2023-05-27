import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { ConfiguracaoItem, ServicoItem, UsuarioItem } from "./container";

export function Item() {
  return (
    <div>
      <MenuItem>
        Dashboard
        <Link to="/home" />
      </MenuItem>
      <SubMenu title="Serviço">
        <ServicoItem />
      </SubMenu>
      <SubMenu title="Usuario">
        <UsuarioItem />
      </SubMenu>
    </div>
  );
}
