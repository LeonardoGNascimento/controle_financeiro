import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export function ServicoItem() {
  return (
    <>
      <MenuItem>
        Listagem
        <Link to="/servico/lista" />
      </MenuItem>
      <MenuItem>
        Cadastro
        <Link to="/servico/cadastra" />
      </MenuItem>
    </>
  );
}

export function ConfiguracaoItem() {
  return (
    <>
      <MenuItem>
        Raça
        <Link to="/configuracao/raca" />
      </MenuItem>
      <MenuItem>
        Tipo
        <Link to="/configuracao/tipo" />
      </MenuItem>
    </>
  );
}

export function UsuarioItem() {
  return (
    <>
      <MenuItem>
        Cadastro
        <Link to="/usuario/cadastra" />
      </MenuItem>
    </>
  );
}
