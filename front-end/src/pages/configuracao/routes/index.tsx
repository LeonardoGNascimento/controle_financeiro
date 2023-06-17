import { Route, Routes } from "react-router-dom";
import { ConfiguracaoFinanceiro } from "../financeiro";

export function ConfiguracaoRoute() {
  return (
    <Routes>
      <Route path="/financeiro" element={<ConfiguracaoFinanceiro />} />
    </Routes>
  );
}
