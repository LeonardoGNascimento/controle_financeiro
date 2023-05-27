import { CartaContainer } from "./style";

interface ICarta {
  titulo: string | number;
  subTitulo: string;
}

export function Carta({ titulo, subTitulo }: ICarta) {
  if (titulo && subTitulo) {
    return (
      <CartaContainer>
        <h5>{titulo}</h5>
        <h6>{subTitulo}</h6>
      </CartaContainer>
    );
  }

  if (titulo) {
    return (
      <CartaContainer>
        <h5>{titulo}</h5>
      </CartaContainer>
    );
  }

  return (
    <CartaContainer>
      <h5>{titulo}</h5>
      <h6>{subTitulo}</h6>
    </CartaContainer>
  );
}
