import styled from "styled-components";

interface Props {
  error: any;
}

export const InputContainer = styled.div<Props>`
  .form-control {
    border: ${(props) => (props.error ? "1px solid red" : "1px solid #ced4da")};
  }
`;
