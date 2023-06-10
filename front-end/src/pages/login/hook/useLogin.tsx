import { Context, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpResponse } from "../../../core/httpResponse";
import { useErro } from "../../../hooks/erro/useErro";
import api from "../../../_service/api/api";

function useLogin() {
  const { setErro } = useErro();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  async function logar(email: string, senha: string) {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/", {
        email,
        senha,
      });

      return new HttpResponse(data, false);
    } catch (error: any) {
      setLoading(false);
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    localStorage.removeItem("@token");
    localStorage.removeItem("@email");
    localStorage.removeItem("@nome");
    navigate("/");
  }

  return {
    logar,
    logout,
    loading,
  };
}

export { useLogin };
