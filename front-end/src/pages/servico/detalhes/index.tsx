import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Tela } from "../../../componets/menu/tela";
import { Pagina } from "../../../componets/tela";
import { useServico } from "../../../hooks/servico/useServico";
import { Documentos } from "./container/documentos";
import { Financeiro } from "./container/financeiro";
import { Resumo } from "./container/resumo";

export function ServicoDetalhes() {
  const { id } = useParams();
  const { buscar, baixarGarantia, servico } = useServico();

  async function baixarGarantiaHandle() {
    if (id) {
      const garantia = new Promise((res) => res(baixarGarantia(id)));

      toast.promise(garantia, {
        pending: "Aguarde",
      });
    }
  }

  useEffect(() => {
    id && buscar(id);
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
            {servico && id && <Resumo id={id} servico={servico} />}
          </Tab>
          <Tab eventKey="documento" title="Documentos">
            <Documentos baixarGarantia={baixarGarantiaHandle} />
          </Tab>
          <Tab eventKey="financeiro" title="Financeiro">
            {id && <Financeiro id={id} />}
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
