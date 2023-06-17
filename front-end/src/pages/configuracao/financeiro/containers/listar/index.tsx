import { TableColumn } from "react-data-table-component";
import { IFinanceiroDescricao } from "../../../../../hooks/financeiro/interface/IFinanceiroDescricao";
import { TelaPagina } from "../../../../../containers/TelaPagina";
import { Table } from "../../../../../componets/table";


interface Props {
  financeiroDescricoes: IFinanceiroDescricao[];
}

export function Listar({ financeiroDescricoes }: Props) {
  const columns: TableColumn<IFinanceiroDescricao>[] = [
    {
      name: "Descrição",
      selector: ({ descricao }) => descricao,
      sortable: true,
    },
  ];

  return (
    <TelaPagina titulo="Financeiro" subTitulo="Configuração">
      <Table
        columns={columns}
        data={financeiroDescricoes}
        pagination={true}
        noDataComponent="Nenhum Financeiro Descrição encontrado"
      />
    </TelaPagina>
  );
}
