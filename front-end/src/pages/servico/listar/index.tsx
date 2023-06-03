import moment from "moment";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { Tela } from "../../../componets/menu/tela";
import { Table } from "../../../componets/table";
import { Pagina } from "../../../componets/tela";
import { useServico } from "../../../hooks/servico/useServico";

export function Listar() {
  const { listar, servicos } = useServico();

  useEffect(() => {
    listar();
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
      selector: ({ finalizado }) =>
        finalizado ? moment(finalizado).format("DD/MM/YYYY HH:mm:ss") : "Não",
      sortable: true,
    },
    {
      name: "Usuário",
      selector: ({ usuario }) => (usuario ? usuario.nome : "-"),
      sortable: true,
    },
    {
      name: "#",
      selector: ({ id }) => (
        <Button href={`/servico/detalhes/${id}`}>Detalhes</Button>
      ),
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
