import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import "react-pro-sidebar/dist/css/styles.css";
import { Pagina } from "../../componets/tela";
import { formatarDinheiro } from "../../core/utils/dinheiro";
import { IServico } from "../../hooks/servico/interface/IServico";
import { useServico } from "../../hooks/servico/useServico";
import { Tela } from "../../componets/menu/tela";

export function Home() {
  const [ganhos, setGanhos] = useState<number>(0);
  const { listar, servicos } = useServico();

  useEffect(() => {
    listar();
  }, []);

  return (
    <Row className="m-0">
      <Col>
        <Tela>
          <Pagina titulo="Ganhos">{formatarDinheiro(ganhos)}</Pagina>
        </Tela>
      </Col>
      <Col>
        <Tela>
          <Pagina titulo="Total Serviços">{servicos.length}</Pagina>
        </Tela>
      </Col>
    </Row>
  );
}
