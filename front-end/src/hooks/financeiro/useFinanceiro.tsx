import { useState } from "react";
import { IFinanceiro } from "./interface/IFinanceiro";
import { useErro } from "../erro/useErro";
import api from "../../_service/api/api";
import { CadastrarFinanceiroCommand } from "./command/cadastrarServico.command";

export function useFinanceiro() {
  const { setErro } = useErro();
  const [loading, setLoading] = useState<boolean>(false);
  const [financeiros, setFinanceiros] = useState<IFinanceiro[]>([]);
  const [financeiro, setFinanceiro] = useState<IFinanceiro>();

  async function cadastrar({
    financeiroDescricaoId,
    servicoId,
    valor,
  }: CadastrarFinanceiroCommand) {
    try {
      setLoading(true);

      const { data } = await api.post(`/financeiro/servico/${servicoId}`, {
        financeiroDescricaoId,
        valor,
      });

      setFinanceiro(data);
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

  async function listar(servicoId: string) {
    try {
      setLoading(true);

      const { data } = await api.get(`/financeiro/servico/${servicoId}`);

      setFinanceiros(data);
    } catch (error: any) {
      setFinanceiros([])
      // setErro(
      //   error.response.data.message
      //     ? error.response.data.message
      //     : "Ocorreu um erro"
      // );
    } finally {
      setLoading(false);
    }
  }

  async function comanda(servicoId: string) {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/financeiro/servico/${servicoId}/comanda`,
        {
          responseType: "blob",
        }
      );

      const url = URL.createObjectURL(data);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Comanda.pdf";
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

  async function excluir(id: string) {
    try {
      setLoading(true);
      await api.delete(`/financeiro/${id}`);
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

  return { excluir, listar, loading, financeiros, cadastrar, comanda };
}
