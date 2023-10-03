import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Private } from "../core/privateRoute";
import { ServicoRoute } from "../pages/servico/route";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { UsuarioRoute } from "../pages/usuario/routes";
import { ConfiguracaoRoute } from "../pages/configuracao/routes";

export function AppRouter() {
  return (
    <BrowserRouter basename="/financeiro">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/home"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route
          path="/servico/*"
          element={
            <Private>
              <ServicoRoute />
            </Private>
          }
        />
        <Route
          path="/usuario/*"
          element={
            <Private>
              <UsuarioRoute />
            </Private>
          }
        />
        <Route
          path="/configuracao/*"
          element={
            <Private>
              <ConfiguracaoRoute />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
