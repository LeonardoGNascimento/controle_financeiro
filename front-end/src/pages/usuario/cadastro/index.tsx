import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../componets/input";
import { Tela } from "../../../componets/menu/style";
import { Table } from "../../../componets/table";
import { Pagina } from "../../../componets/tela";
import { IUsuario } from "../../../hooks/usuario/interface/IUsuario";
import { useUsuario } from "../../../hooks/usuario/useUsuario";
import { ICadastroUsuario, schema } from "./yup/schema";

export function CadastroUsuario() {
  const [usuarios, setUsuario] = useState<IUsuario[]>([]);
  const { cadastro, listar } = useUsuario();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICadastroUsuario>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    listarUsuario();
  }, []);

  async function listarUsuario() {
    const { data, hasErro } = await listar();

    if (hasErro) {
      return;
    }

    setUsuario(data);
  }

  const columns: TableColumn<any>[] = [
    {
      name: "Nome",
      selector: ({ nome }) => nome,
      sortable: true,
    },
    {
      name: "Email",
      selector: ({ email }) => email,
      sortable: true,
    },
  ];

  async function handleCadastroUsuario(e: ICadastroUsuario) {
    const { data, hasErro } = await cadastro(e);

    if (hasErro) {
      return toast.error(data.message);
    }

    await listarUsuario();
    toast.success("Usuário cadastrado com sucesso");
  }

  return (
    <>
      <Tela>
        <Pagina titulo="Cadastro" subTitulo="Usuário">
          <Form onSubmit={handleSubmit(handleCadastroUsuario)}>
            <Row className="mb-5">
              <Col>
                <Input error={errors.nome?.message}>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome"
                      {...register("nome")}
                    />
                  </Form.Group>
                </Input>
              </Col>
              <Col>
                <Input error={errors.email?.message}>
                  <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Insira o email"
                      {...register("email")}
                    />
                  </Form.Group>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input error={errors.senha?.message}>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Insira a senha"
                      {...register("senha")}
                    />
                  </Form.Group>
                </Input>
              </Col>
              <Col className="mt-4">
                <Button type="submit">Cadastrar</Button>
              </Col>
            </Row>
          </Form>
        </Pagina>
      </Tela>
      <Tela>
        <Pagina titulo="Listagem" subTitulo="Usuário">
          <Table
            columns={columns}
            data={usuarios}
            pagination={true}
            noDataComponent="Nenhum usuário encontrado"
          />
        </Pagina>
      </Tela>
    </>
  );
}
