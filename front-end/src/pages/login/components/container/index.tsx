interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-10 grid grid-cols-2">{children}</div>
    </div>
  );
}
