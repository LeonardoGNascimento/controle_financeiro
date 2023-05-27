import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { Tela } from "../../../componets/menu/style";
import { Table } from "../../../componets/table";
import { Pagina } from "../../../componets/tela";
import { IServico } from "../../../hooks/servico/interface/IServico";
import { useServico } from "../../../hooks/servico/useServico";

export function Listar() {
  const { listar } = useServico();

  const [servicos, setServicos] = useState<IServico[]>([]);

  useEffect(() => {
    const listarServicos = async () => {
      const servicosData: IServico[] = await listar(
        "servicoModelo=true&excluido=0"
      );

      if (servicosData) {
        setServicos(servicosData);
      }
    };

    listarServicos();
  }, []);

  const columns: TableColumn<any>[] = [
    {
      name: "Cliente",
      selector: ({ clienteNome }) => clienteNome,
      sortable: true,
    },
    {
      name: "Serviço",
      selector: ({ servicoModelo }) =>
        servicoModelo ? servicoModelo.nome : "-",
      sortable: true,
    },
    {
      name: "Data Abertura",
      selector: ({ dataHora }) => moment(dataHora).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Finalizado",
      selector: ({ finalizado }) => {
        const final = finalizado
          ? moment(finalizado).format("DD/MM/YYYY HH:mm:ss")
          : "Não";

        return final;
      },
      sortable: true,
    },
    {
      name: "#",
      selector: ({ id }) => {
        return <Button href={`/servico/detalhes/${id}`}>Detalhes</Button>;
      },
      sortable: true,
    },
  ];

  return (
    <Tela>
      <Pagina titulo="Listagem" subTitulo="Serviço">
        <Table
          columns={columns}
          data={servicos}
          pagination={true}
          noDataComponent="Nenhum serviço encontrado"
        />
      </Pagina>
    </Tela>
  );
}
