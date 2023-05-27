import { Error } from "../erro/style";
import { InputContainer } from "./style";

interface Props {
  children: React.ReactNode;
  error: string | undefined;
}

export function Input({ error, children }: Props) {
  return (
    <InputContainer error={error}>
      {children}
      <Error>{error}</Error>
    </InputContainer>
  );
}
