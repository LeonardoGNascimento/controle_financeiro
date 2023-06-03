interface Props {
  children: any;
  titulo?: string;
  subTitulo?: string;
}

export function Pagina({ children, titulo, subTitulo }: Props) {
  if (titulo && subTitulo) {
    return (
      <>
        <p>
          {subTitulo} - <span className="text-2xl">{titulo}</span>
        </p>
        <hr />
        <div>{children}</div>
      </>
    );
  }

  return (
    <>
      <p>
        <span className="text-2xl">{titulo}</span>
      </p>
      <hr />
      <div>{children}</div>
    </>
  );
}
