import { useState } from "react";
import { HttpResponse } from "../../core/httpResponse";
import {
  ICadastroServico,
  ICadastroServicoModelo,
} from "../../pages/servico/cadastro/yup/schema";
import api from "../../_service/api/api";
import { useErro } from "../erro/useErro";
import { IServico } from "./interface/IServico";
import { IServicoModelo } from "./interface/IServicoModelo";

export function useServico() {
  const { setErro } = useErro();

  const [loading, setLoading] = useState<boolean>(false);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [servico, setServico] = useState<IServico>();
  const [servicosModelo, setServicosModelo] = useState<IServicoModelo[]>([]);

  async function listar(query: string = "") {
    try {
      setLoading(true);
      const { data } = await api.get(`/servico/?${query}`);

      setServicos(data);
    } catch (error: any) {
      setErro(
        error.response.data.message
          ? error.response.data.message
          : "Ocorreu um erro"
      );
    } finally {
      setLoading(false);
    }
  }

  async function cadastro(cadastroServico: ICadastroServico) {
    try {
      setLoading(true);
      const { data } = await api.post(`/servico/`, cadastroServico);

      return new HttpResponse(data, false);
    } catch (error: any) {
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  async function excluir(id: string) {
    try {
      setLoading(true);
      const { data } = await api.patch(`/servico/${id}/exclui`);

      return new HttpResponse(data, false);
    } catch (error: any) {
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  async function cadastroModelo(cadastroServicoModelo: ICadastroServicoModelo) {
    try {
      setLoading(true);
      const { data } = await api.post(`/servico/modelo`, cadastroServicoModelo);

      return new HttpResponse(data, false);
    } catch (error: any) {
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  async function listarModelos() {
    try {
      setLoading(true);
      const { data } = await api.get("/servico/modelo");

      setServicosModelo(data);
    } catch (error: any) {
      setErro(
        error.response.data.message
          ? error.response.data.message
          : "Ocorreu um erro"
      );
    } finally {
      setLoading(false);
    }
  }

  async function buscar(id: string) {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/servico/${id}?cliente=true&servicoModelo=true&celular=true`
      );

      setServico(data);
    } catch (error: any) {
      setErro(
        error.response.data.message
          ? error.response.data.message
          : "Ocorreu um erro"
      );
    } finally {
      setLoading(false);
    }
  }

  async function baixarGarantia(id: string) {
    try {
      setLoading(true);
      const { data } = await api.get(`/servico/garantia/${id}`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(data);
      // window.open(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Garantia.pdf";
      a.click();
      a.remove();
    } catch (error: any) {
      setErro(
        error.response.data.message
          ? error.response.data.message
          : "Ocorreu um erro"
      );
    } finally {
      setLoading(false);
    }
  }

  async function finalizar(id: string, tipoPagamento: string) {
    try {
      setLoading(true);
      const { data } = await api.patch(`/servico/${id}/finaliza`, {
        tipoPagamento,
      });

      return new HttpResponse(data, false);
    } catch (error: any) {
      return new HttpResponse(error.response.data, true);
    } finally {
      setLoading(false);
    }
  }

  return {
    listar,
    buscar,
    baixarGarantia,
    servicosModelo,
    listarModelos,
    cadastro,
    finalizar,
    cadastroModelo,
    excluir,
    servicos,
    servico,
  };
}
