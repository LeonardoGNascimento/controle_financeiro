import { Button, Col, Row } from "react-bootstrap";

interface Props {
  baixarGarantia(): void;
}

export function Documentos({ baixarGarantia }: Props) {
  return (
    <>
      <h4>Baixar Documentos</h4>
      <Row className="mt-5">
        <Col>
          <Button onClick={() => baixarGarantia()}>Garantia</Button>
        </Col>
      </Row>
    </>
  );
}
