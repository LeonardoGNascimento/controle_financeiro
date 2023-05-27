import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { formatarDinheiro } from "../../../../../core/utils/dinheiro";
import { IServico } from "../../../../../hooks/servico/interface/IServico";

interface Props {
  servico: IServico;
  id?: string;
}

export function Resumo({ id, servico }: Props) {
  return (
    <>
      <div className="mb-5">
        <h4>Resumo - {id}</h4>
        <Row className="mb-3">
          <Col>Orçamento: {formatarDinheiro(servico.orcamento)}</Col>
          <Col>Servico: {servico.servicoModelo?.nome}</Col>
          <Col>
            Data Abertura: {moment(servico.dataHora).format("DD/MM/YYYY")}
          </Col>
          <Col>
            Finalizado:{" "}
            {servico.finalizado
              ? moment(servico.finalizado).format("DD/MM/YYYY")
              : "Não"}
          </Col>
        </Row>
        <Row>
          {servico.tipoPagamento ? (
            <Col>Tipo Pagamento: {servico.tipoPagamento}</Col>
          ) : (
            ""
          )}
        </Row>
      </div>
      {servico.imei ? <h4>Celular</h4> : <h4>Aparelho</h4>}
      <Row className="mb-5">
        {servico.imei ? <Col>IMEI: {servico.imei}</Col> : ""}
        {servico.modelo ? <Col>Modelo: {servico.modelo}</Col> : ""}
        <Col></Col>
        <Col></Col>
      </Row>
      <h4>Cliente</h4>
      <Row className="mb-5">
        <Col>Nome: {servico.clienteNome}</Col>
        <Col>Telefone: {servico.clienteNumero}</Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
}
