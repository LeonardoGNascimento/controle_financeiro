import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { IServico } from "../../../../../hooks/servico/interface/IServico";

interface Props {
  servico: IServico;
  id: string;
}

export function Resumo({ id, servico }: Props) {
  return (
    <>
      <div className="mb-5">
        <h4>Resumo - {id}</h4>
        <Row className="mb-3">
          {/* <Col>Orçamento: {formatarDinheiro(servico.orcamento)}</Col> */}
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
        <Row></Row>
      </div>
      <h4>Veículo</h4>
      <Row className="mb-5">
        <Col>Placa: {servico.placa}</Col>
        <Col></Col>
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
