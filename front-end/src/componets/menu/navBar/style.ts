import styled from "styled-components";

export const NavBarContainer = styled.div`
  width: auto;
`;
export const ButtonColapse = styled.button`
  border: 0;
  border-radius: 100px;
  width: 30px;
  height: 30px;
  margin: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
`;
