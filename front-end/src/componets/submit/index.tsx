import { Spinner } from "react-bootstrap";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

export function Submit({ loading, children }: Props) {
  return <>{loading ? <Spinner animation="border" /> : children}</>;
}
