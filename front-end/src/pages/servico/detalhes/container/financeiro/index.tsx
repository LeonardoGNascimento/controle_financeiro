import { Button, Col, Row } from "react-bootstrap";
import { Table } from "../../../../../componets/table";
import { TableColumn } from "react-data-table-component";

interface Props {
  baixarGarantia(): void;
}

export function Financeiro({ baixarGarantia }: Props) {
  const columns: TableColumn<any>[] = [
    {
      name: "Data Hora",
      selector: ({ dataHora }) => dataHora,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ descricao }) => descricao,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ valor }) => valor,
      sortable: true,
    },
  ];

  const data = [
    {
      dataHora: "10/10/10 10:10:10",
      descricao: "lampada",
      valor: 10.20
    }
  ]

  return (
    <div>
      <h4>Financeiro</h4>
      <Table columns={columns} data={data}/>

      <Button onClick={() => console.log('asd')}>Garantia</Button>
    </div>
  );
}
