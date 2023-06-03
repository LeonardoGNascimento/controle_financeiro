import { useState } from "react";
import api from "../../_service/api/api";
import { IFinanceiroDescricao } from "./interface/IFinanceiroDescricao";
import { useErro } from "../erro/useErro";

export function useFinanceiroDescricao() {
  const [financeiroDescricoes, setFinanceiroDescricoes] = useState<
    IFinanceiroDescricao[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setErro } = useErro();

  async function listar() {
    try {
      const { data } = await api.get("/financeiro/descricao");

      setFinanceiroDescricoes(data);
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

  return { listar, financeiroDescricoes };
}
