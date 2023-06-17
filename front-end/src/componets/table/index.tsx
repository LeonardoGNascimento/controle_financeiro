import DataTable from "react-data-table-component";
import { Container } from "./style";

class Props {
  columns: any[] = [];
  data: any[] = [];
  pagination?: boolean;
  noDataComponent?: string;
  paginationRowsPerPageOptions?: number[];
  paginationPerPage?: number = 50;
}

export function Table({
  columns,
  data,
  pagination,
  noDataComponent,
  paginationRowsPerPageOptions,
  paginationPerPage,
}: Props) {
  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
    },
  };

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        customStyles={customStyles}
        responsive={true}
        noDataComponent={noDataComponent}
      />
    </Container>
  );
}
