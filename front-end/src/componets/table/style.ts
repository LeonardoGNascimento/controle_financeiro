import DataTable from "react-data-table-component";
import styled from "styled-components";

export const CustomTable = styled(DataTable)`
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Container = styled.div``;
