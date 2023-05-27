import { Route, Routes } from "react-router-dom";
import { CadastrarServico } from "../cadastro";
import { ServicoDetalhes } from "../detalhes";
import { Listar } from "../listar";

export function ServicoRoute() {
  return (
    <Routes>
      <Route path="/lista" element={<Listar />} />
      <Route path="/cadastra" element={<CadastrarServico />} />
      <Route path="/detalhes/:id" element={<ServicoDetalhes />} />
    </Routes>
  );
}
