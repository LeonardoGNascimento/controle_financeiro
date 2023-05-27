import { Button, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  handleClose(): void;
  children: any;
}

export function CustomModal({ handleClose, show, children }: Props) {
  return (
    <Modal show={show} onHide={handleClose}>
      {children}
    </Modal>
  );
}
