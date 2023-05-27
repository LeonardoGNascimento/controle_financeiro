interface Props {
  children: any;
  titulo?: string;
  subTitulo?: string;
}

export function Pagina({ children, titulo, subTitulo }: Props) {
  const style = {
    fontSize: 24,
  };

  if (titulo && subTitulo) {
    return (
      <>
        <p>
          {subTitulo} - <span style={style}>{titulo}</span>
        </p>
        <hr />
        <div>{children}</div>
      </>
    );
  }

  return (
    <>
      <p>
        <span style={style}>{titulo}</span>
      </p>
      <hr />
      <div>{children}</div>
    </>
  );
}
