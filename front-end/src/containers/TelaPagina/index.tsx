import { Tela } from "../../componets/menu/tela";
import { Pagina } from "../../componets/tela";

interface Props {
  children: any;
  titulo?: string;
  subTitulo?: string;
}

export function TelaPagina({ children, titulo, subTitulo }: Props) {
  return (
    <Tela>
      <Pagina titulo={titulo} subTitulo={subTitulo}>
        {children}
      </Pagina>
    </Tela>
  );
}
