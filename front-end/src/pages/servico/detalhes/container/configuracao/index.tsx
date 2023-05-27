import { Button, Col, Form, Modal, Row } from "react-bootstrap";

interface Props {
  id: string;
  show: boolean;
  setShow(show: boolean): void;
  finalizar(id: string): void;
  disableFinalizar: boolean;
  setTipoPagamento(tipoPagamento: string): void;
  excluir(id: string): void;
}

export function Configuracao({
  finalizar,
  id,
  disableFinalizar,
  setShow,
  show,
  setTipoPagamento,
  excluir,
}: Props) {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Finalizar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Pagamento</Form.Label>
            <Form.Select onChange={(e) => setTipoPagamento(e.target.value)}>
              <option>Selecione um metodo de pagamento</option>
              <option value="PIX">PIX</option>
              <option value="CREDITO">Crédito</option>
              <option value="DEBITO">Débito</option>
              <option value="DINHEIRO">Dinheiro</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => finalizar(id)}>
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal>

      <h4 className="mb-4">Configuração</h4>
      <Row className="mt-5">
        <Col>
          <Button disabled={disableFinalizar} onClick={() => setShow(true)}>
            Finalizar
          </Button>
        </Col>
        <Col>
          <Button onClick={() => excluir(id)}>Excluir</Button>
        </Col>
      </Row>
    </>
  );
}
