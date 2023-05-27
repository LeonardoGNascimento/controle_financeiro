import { Route, Routes } from "react-router-dom";
import { CadastroUsuario } from "../cadastro";

export function UsuarioRoute() {
  return (
    <Routes>
      <Route path="/cadastra" element={<CadastroUsuario />} />
    </Routes>
  );
}
