import DataTable from "react-data-table-component";
import { Container } from "./style";

interface Props {
  columns: any[];
  data: any[];
  pagination?: boolean;
  noDataComponent?: string;
}

export function Table({ columns, data, pagination, noDataComponent }: Props) {
  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
    },
    cells: {
      style: {},
    },
  };

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
        customStyles={customStyles}
        responsive={true}
        noDataComponent={noDataComponent}
      />
    </Container>
  );
}
