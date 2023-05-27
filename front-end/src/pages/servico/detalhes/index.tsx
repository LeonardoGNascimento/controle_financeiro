import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Tela } from "../../../componets/menu/style";
import { Pagina } from "../../../componets/tela";
import { IServico } from "../../../hooks/servico/interface/IServico";
import { useServico } from "../../../hooks/servico/useServico";
import { Configuracao } from "./container/configuracao";
import { Documentos } from "./container/documentos";
import { Resumo } from "./container/resumo";
import { Financeiro } from "./container/financeiro";

export function ServicoDetalhes() {
  const { id } = useParams();
  const { buscar, baixarGarantia, finalizar, excluir } = useServico();
  const [servico, setServico] = useState<IServico>();
  const [disableFinalizar, setDisableFinalizar] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [tipoPagamento, setTipoPagamento] = useState<string>("");

  async function baixarGarantiaHandle() {
    if (id) {
      const garantia = new Promise((res) => res(baixarGarantia(id)));

      toast.promise(garantia, {
        pending: "Aguarde",
      });
    }
  }

  async function buscarServico() {
    if (id) {
      const data: IServico = await buscar(id);

      if (data.finalizado) {
        setDisableFinalizar(true);
      }

      setServico(data);
    }
  }

  async function finalizarHandle() {
    if (id) {
      const { data, hasErro } = await finalizar(id, tipoPagamento);

      if (hasErro) {
        if (Array.isArray(data.message)) {
          toast.error(data.message.join("\n"));
          return;
        }

        toast.error(data.message);
        return;
      }

      setShow(false);
      toast.success("Serviço finalizado com sucesso");

      await buscarServico();
    }
  }

  async function excluirHandle(id: string) {
    const { isConfirmed } = await Swal.fire({
      title: "Deseja realmente excluir esse serviço",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Excluir",
      text: "Esse processo é irreversível",
    });

    if (!isConfirmed) {
      return;
    }

    const { data, hasErro } = await excluir(id);

    if (hasErro) {
      return toast.error(data.message);
    }

    return toast.success("Serviço excluido com sucesso");
  }

  useEffect(() => {
    buscarServico();
  }, []);

  return (
    <Tela>
      <Pagina titulo="Detalhes" subTitulo="Serviço">
        <Tabs
          defaultActiveKey="resumo"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="resumo" title="Detalhes">
            {servico ? <Resumo id={id} servico={servico} /> : ""}
          </Tab>
          <Tab eventKey="documento" title="Documentos">
            <Documentos baixarGarantia={baixarGarantiaHandle} />
          </Tab>
          <Tab eventKey="financeiro" title="Financeiro">
            <Financeiro baixarGarantia={baixarGarantiaHandle} />
          </Tab>
          {/* <Tab eventKey="configuracao" title="Configuração">
            {id ? (
              <Configuracao
                finalizar={finalizarHandle}
                setShow={setShow}
                show={show}
                id={id}
                disableFinalizar={disableFinalizar}
                setTipoPagamento={setTipoPagamento}
                excluir={excluirHandle}
              />
            ) : (
              ""
            )} */}
          {/* </Tab> */}
        </Tabs>
      </Pagina>
    </Tela>
  );
}
