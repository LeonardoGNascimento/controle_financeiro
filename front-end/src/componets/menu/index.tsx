import { useLogin } from "../../pages/login/hook/useLogin";
import { getLocalStore } from "../../_service/localStore/localStore";
import { useMenu } from "./hook/useMenu";
import { NavBar } from "./navBar";
import { SlideBar } from "./slideBar";
import { Container, ContainerMenu } from "./style";

interface Props {
  children: any;
}

export function Screen({ children }: Props) {
  const { colapsed, setColapsed } = useMenu();
  const { logout } = useLogin();
  const nome = getLocalStore("@nome");

  return (
    <ContainerMenu>
      <SlideBar colapsed={colapsed} logout={logout} />
      <Container>
        <NavBar colapsed={colapsed} setColapsed={setColapsed} nome={nome} />
        {children}
      </Container>
    </ContainerMenu>
  );
}
