import { Button } from "react-bootstrap";
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

export const Div = styled.div`
  padding: 2rem;
`;

export const LoginModal = styled.div`
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  box-shadow: 0 1px 6px 5px rgba(32, 33, 36, 0.28);
`;

export const Titulo = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const ContainerBotaoLogar = styled.div`
  display: flex;
  justify-content: center;
`;

export const BotaoLogin = styled(Button)`
  border: 0;
  color: #fff;
  padding: 1rem 3rem;
  border-radius: 10px;
`;
export const LoginImage = styled.div`
  position: absolute;
  top: 10rem;
  left: 16rem;
`;

export const Image = styled.img`
  /* width: 100%; */
`;
