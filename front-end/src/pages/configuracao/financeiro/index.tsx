import { useEffect } from "react";
import { Listar } from "./containers/listar";
import { useFinanceiroDescricao } from "../../../hooks/financeiro/useFinanceiroDescricao";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CadastrarFinanceiroDescricaoCommand } from "./command/cadastrarFinanceiroDescricao.command";
import { schema } from "./yup/cadastrarFinanceiroDescricao";
import { TelaPagina } from "../../../containers/TelaPagina";
import { Col, Form, FormLabel, Row } from "react-bootstrap";
import { Input } from "../../../componets/input";
import { Button } from "../../../componets/botao/Button";

export function ConfiguracaoFinanceiro() {
  const { financeiroDescricoes, listar, cadastrar } = useFinanceiroDescricao();

  async function handleCadastro(params: CadastrarFinanceiroDescricaoCommand) {
    await cadastrar(params);
    await listar();
  }

  useEffect(() => {
    listar();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastrarFinanceiroDescricaoCommand>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <TelaPagina titulo="Cadastro Descrição" subTitulo="Configuração">
        <Form onSubmit={handleSubmit(handleCadastro)}>
          <Row>
            <Col>
              <Input error={errors.descricao?.message}>
                <FormLabel>Nome cliente</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Insira descrição"
                  {...register("descricao")}
                />
              </Input>
            </Col>
          </Row>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </TelaPagina>
      <Listar financeiroDescricoes={financeiroDescricoes} />
    </>
  );
}
