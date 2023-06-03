import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "fontawesome-4.7/css/font-awesome.min.css";
import { ToastContainer } from "react-toastify";
import { IUsuario } from "./hooks/usuario/interface/IUsuario";

declare global {
  interface Window {
    user: IUsuario;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <App />
  </React.StrictMode>
);
