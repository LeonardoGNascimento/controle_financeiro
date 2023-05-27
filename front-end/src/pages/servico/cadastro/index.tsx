import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Col, Form, FormLabel, Row } from "react-bootstrap";
import { Input } from "../../../componets/input";
import { Tela } from "../../../componets/menu/style";
import { Pagina } from "../../../componets/tela";
import { useEffect } from "react";
import {
  ICadastroServico,
  ICadastroServicoModelo,
  schema,
  schemaModelo,
} from "./yup/schema";
import { useServico } from "../../../hooks/servico/useServico";
import CurrencyInput from "react-currency-input-field";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

export function CadastrarServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICadastroServico>({
    resolver: yupResolver(schema),
  });

  const {
    register: registerModelo,
    handleSubmit: handleSubmitModelo,
    formState: { errors: errorsModelo },
  } = useForm<ICadastroServicoModelo>({
    resolver: yupResolver(schemaModelo),
  });

  const { servicosModelo, listarModelos, cadastro, cadastroModelo } =
    useServico();

  useEffect(() => {
    listarModelos();
  }, []);

  const handleServico = async ({
    clienteNome,
    clienteNumero,
    imei,
    orcamento,
    servicoModeloId,
    modelo,
  }: ICadastroServico) => {
    const { data, hasErro } = await cadastro({
      clienteNome,
      clienteNumero,
      imei,
      orcamento: Number(
        String(orcamento)
          .replace(/[R$ ]/g, "")
          .replace(/[.]/g, "")
          .replace(/[,]/g, ".")
      ),
      servicoModeloId: Number(servicoModeloId),
      modelo,
    });

    if (hasErro) {
      return toast.error(data.message);
    }

    return toast.success("Processo cadastrado com sucesso");
  };

  const handleServicoModelo = async (
    cadastroServicoModelo: ICadastroServicoModelo
  ) => {
    const { data, hasErro } = await cadastroModelo(cadastroServicoModelo);

    if (hasErro) {
      return toast.error(data.message);
    }

    await listarModelos();

    return toast.success("Modelo cadastrado");
  };

  return (
    <>
      <Tela>
        <Pagina titulo="Cadastro" subTitulo="Serviço">
          <Form onSubmit={handleSubmit(handleServico)}>
            <Row>
              <Col>
                <Input error={errors.servicoModeloId?.message}>
                  <Form.Group className="mb-3">
                    <FormLabel>Serviço</FormLabel>
                    <Form.Select {...register("servicoModeloId")}>
                      <option value="">Selecione o modelo</option>
                      {servicosModelo
                        ? servicosModelo.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.nome}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                </Input>
              </Col>
              <Col>
                <Form.Group>
                  <Input error={errors.orcamento?.message}>
                    <FormLabel>Orçamento</FormLabel>
                    <CurrencyInput
                      id="input-example"
                      className="form-control"
                      placeholder="Please enter a number"
                      defaultValue={0}
                      decimalsLimit={2}
                      {...register("orcamento")}
                      prefix="R$ "
                    />
                  </Input>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Group>
                  <Input error={errors.clienteNome?.message}>
                    <FormLabel>Nome cliente</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Insira nome do cliente"
                      {...register("clienteNome")}
                    />
                  </Input>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Input error={errors.clienteNumero?.message}>
                    <FormLabel>Número cliente</FormLabel>
                    <Form.Control
                      as={InputMask}
                      type="text"
                      placeholder="Insira número do cliente"
                      mask="(99) 99999-9999"
                      {...register("clienteNumero")}
                    />
                  </Input>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Input error={""}>
                    <FormLabel>IMEI</FormLabel>
                    <Form.Control
                      type="number"
                      placeholder="Insira IMEI"
                      {...register("imei")}
                    />
                  </Input>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Input error={""}>
                    <FormLabel>Modelo</FormLabel>
                    <Form.Control
                      type="text"
                      placeholder="Insira o modelo"
                      {...register("modelo")}
                    />
                  </Input>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Pagina>
      </Tela>
      <Tela>
        <Pagina titulo="Cadastro" subTitulo="Serviço Modelo">
          <Form onSubmit={handleSubmitModelo(handleServicoModelo)}>
            <Row>
              <Col md="8">
                <Input error={errorsModelo.nome?.message}>
                  <Form.Group className="mb-3">
                    <FormLabel>Nome</FormLabel>
                    <Form.Control
                      type="text"
                      {...registerModelo("nome")}
                      placeholder="Insira o nome do serviço"
                    />
                  </Form.Group>
                </Input>
              </Col>
              <Col md="4" className="mt-4">
                <Button type="submit">Cadastrar</Button>
              </Col>
            </Row>
          </Form>
        </Pagina>
      </Tela>
    </>
  );
}
