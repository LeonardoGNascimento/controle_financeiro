import { Button as ButtonBootStap, ButtonProps } from "react-bootstrap";

interface Props extends ButtonProps {}

// border: 0;
// color: #fff;
// padding: 1rem 3rem;
// border-radius: 10px;

export function Button({}: Props) {
  return <ButtonBootStap className="border" type="submit">Entrar</ButtonBootStap>;
}
