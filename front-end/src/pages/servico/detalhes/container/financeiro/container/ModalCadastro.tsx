import { Col, Form, FormLabel, Row } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../../../../../componets/input";
import { Modal } from "../../../../../../componets/modal";
import { CadastrarFinanceiroCommand } from "../../../../../../hooks/financeiro/command/cadastrarServico.command";
import { IFinanceiroDescricao } from "../../../../../../hooks/financeiro/interface/IFinanceiroDescricao";

interface Props {
  show: boolean;
  setShow(show: boolean): void;
  errors: FieldErrors<CadastrarFinanceiroCommand>;
  register: UseFormRegister<CadastrarFinanceiroCommand>;
  handleSubmit(): void;
  financeiroDescricao: IFinanceiroDescricao[];
}

export function ModalCadastro({
  setShow,
  show,
  errors,
  register,
  handleSubmit,
  financeiroDescricao,
}: Props) {
  return (
    <Modal
      show={show}
      handleClose={() => setShow(!show)}
      footer={true}
      formId="cadastrarFinanceiro"
    >
      <Form onSubmit={handleSubmit} id="cadastrarFinanceiro">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Valor</FormLabel>
              <Input error={errors.financeiroDescricaoId?.message}>
                <Form.Select
                  {...register("financeiroDescricaoId")}
                  placeholder="Insira o valor"
                >
                  {financeiroDescricao.map(({ id, descricao }) => (
                    <option value={id}>{descricao}</option>
                  ))}
                </Form.Select>
              </Input>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <FormLabel>Valor</FormLabel>
              <Input error={errors.valor?.message}>
                <CurrencyInput
                  className="form-control"
                  id="input-example"
                  placeholder="Digite o valor"
                  decimalsLimit={2}
                  {...register("valor")}
                />
              </Input>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
