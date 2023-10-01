import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ButtonColapse, NavBarContainer } from "./style";

interface Props {
  colapsed: boolean;
  setColapsed: (param: boolean) => void;
  nome: string | null;
}

export function NavBar({ setColapsed, colapsed, nome }: Props) {
  return (
    <NavBarContainer>
      <Navbar bg="light">
        <ButtonColapse onClick={() => setColapsed(!colapsed)}>
          {!colapsed ? <FaAngleLeft /> : <FaAngleRight />}
        </ButtonColapse>
        <Container>
          <Navbar.Brand>Legana Tech</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          Olá, {nome}
        </Container>
      </Navbar>
    </NavBarContainer>
  );
}
