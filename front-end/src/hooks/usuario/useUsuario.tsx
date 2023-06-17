import { useState } from "react";
import { HttpResponse } from "../../core/httpResponse";
import { ICadastroUsuario } from "../../pages/usuario/cadastro/yup/schema";
import api from "../../_service/api/api";

export function useUsuario() {
  const [loading, setLoading] = useState<boolean>(false);

  async function cadastro(cadastroUsuario: ICadastroUsuario) {
    try {
      setLoading(true);
      const { data } = await api.post(`/usuario`, cadastroUsuario);

      return new HttpResponse(data, false);
    } catch (error: any) {
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  async function listar() {
    try {
      setLoading(true);
      const { data } = await api.get(`/usuario`);

      return new HttpResponse(data, false);
    } catch (error: any) {
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  return {
    cadastro,
    loading,
    listar,
  };
}
