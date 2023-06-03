import { Button, Col, Modal as ModalBootstrap, Row } from "react-bootstrap";

interface Props {
  show: boolean;
  handleClose(): void;
  children: any;
  footer?: boolean;
  formId?: string;
}

export function Modal({ handleClose, show, children, footer, formId }: Props) {
  return (
    <ModalBootstrap show={show} onHide={handleClose}>
      {/* <ModalBootstrap.Header closeButton>Aqui</ModalBootstrap.Header> */}
      <ModalBootstrap.Body>{children}</ModalBootstrap.Body>
      {footer && (
        <ModalBootstrap.Footer>
          <Row>
            <Col>
              <Button variant="danger" onClick={() => handleClose()}>
                Cancelar
              </Button>
            </Col>
            <Col>
              <Button type="submit" form={formId}>
                Confirmar
              </Button>
            </Col>
          </Row>
        </ModalBootstrap.Footer>
      )}
    </ModalBootstrap>
  );
}
