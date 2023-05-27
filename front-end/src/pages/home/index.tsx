import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "react-pro-sidebar/dist/css/styles.css";
import { Tela } from "../../componets/menu/style";
import { Pagina } from "../../componets/tela";
import { formatarDinheiro } from "../../core/utils/dinheiro";
import { IServico } from "../../hooks/servico/interface/IServico";
import { useServico } from "../../hooks/servico/useServico";
import { Grafico } from "./container/grafico";

export function Home() {
  const { listar } = useServico();

  const [servicos, setServicos] = useState<IServico[]>([]);
  const [ultimoServico, setUltimoServico] = useState<IServico>();
  const [ganhos, setGanhos] = useState<number>(0);

  const [options, setOptions] = useState({
    title: "Gráfico de Pizza",
  });
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    const listarServicos = async () => {
      const servicosData: IServico[] = await listar("excluido=0");

      if (servicosData) {
        setServicos(servicosData);
        setUltimoServico(servicosData[0]);

        const dinheiroArray: any[] = [];
        const creditoArray: any[] = [];
        const debitoArray: any[] = [];
        const pixArray: any[] = [];

        servicosData.forEach((item) => {
          if (item.tipoPagamento) {
            switch (item.tipoPagamento) {
              case "PIX":
                pixArray.push(item);
                break;
              case "DEBITO":
                debitoArray.push(item);
                break;
              case "CREDITO":
                creditoArray.push(item);
                break;
              case "DINHEIRO":
                dinheiroArray.push(item);
                break;
            }
          }
        });

        setData([
          ["Linguagens", "Quantidade"],
          ["Crédito", creditoArray.length],
          ["Débito", debitoArray.length],
          ["PIX", pixArray.length],
          ["Dinheiro", dinheiroArray.length],
        ]);

        const ganhosFinalizados =
          servicosData.length > 1
            ? servicosData
                .map((item) => item.orcamento)
                .reduce((a, p) => Number(a) + Number(p))
            : servicosData[0].orcamento;
        setGanhos(ganhosFinalizados);
      }
    };

    listarServicos();
  }, []);

  return (
    <>
      <Row>
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
      <Row>
        <Col>
          <Tela>
            <Pagina titulo="Ultimo Serviço">
              <Grafico data={data} options={options} />
            </Pagina>
          </Tela>
        </Col>
      </Row>
    </>
  );
}
