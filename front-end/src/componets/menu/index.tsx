import { useLogin } from "../../pages/login/hook/useLogin";
import { Usuario } from "../../_service/localStore/localStore";
import { useMenu } from "./hook/useMenu";
import { NavBar } from "./navBar";
import { SideBar } from "./slideBar";
import { Container, ContainerMenu } from "./style";

interface Props {
  children: any;
}

export function Screen({ children }: Props) {
  const { colapsed, setColapsed } = useMenu();
  const { logout } = useLogin();

  return (
    <ContainerMenu>
      <SideBar colapsed={colapsed} logout={logout} />
      <Container>
        <NavBar
          colapsed={colapsed}
          setColapsed={setColapsed}
          nome={Usuario.getNome()}
        />
        {children}
      </Container>
    </ContainerMenu>
  );
}
