import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export function ServicoItem() {
  return (
    <>
      <MenuItem component={<Link to="/servico/lista" />}>Listagem</MenuItem>
      <MenuItem component={<Link to="/servico/cadastra" />}>Cadastro</MenuItem>
    </>
  );
}

export function ConfiguracaoItem() {
  return (
    <>
      <MenuItem component={<Link to="/configuracao/raca" />}>Raça</MenuItem>
      <MenuItem component={<Link to="/configuracao/tipo" />}>Tipo</MenuItem>
    </>
  );
}

export function UsuarioItem() {
  return (
    <>
      <MenuItem component={<Link to="/usuario/cadastra" />}>Cadastro</MenuItem>
    </>
  );
}
