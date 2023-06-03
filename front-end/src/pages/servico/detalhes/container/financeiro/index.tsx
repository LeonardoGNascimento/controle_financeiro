import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { Table } from "../../../../../componets/table";
import { formatarDinheiro } from "../../../../../core/utils/dinheiro";
import { CadastrarFinanceiroCommand } from "../../../../../hooks/financeiro/command/cadastrarServico.command";
import { useFinanceiro } from "../../../../../hooks/financeiro/useFinanceiro";
import { useFinanceiroDescricao } from "../../../../../hooks/financeiro/useFinanceiroDescricao";
import { ModalCadastro } from "./container/ModalCadastro";
import { cadastrarFinanceiroSchema } from "../../../../../hooks/financeiro/schema/cadastrarFinanceiro.schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  id: string;
}

export function Financeiro({ id }: Props) {
  const { listar, financeiros, cadastrar, comanda } = useFinanceiro();
  const { listar: listarDescricao, financeiroDescricoes } =
    useFinanceiroDescricao();
  const [show, setShow] = useState(false);

  useEffect(() => {
    listar(id);
    listarDescricao();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastrarFinanceiroCommand>({
    resolver: yupResolver(cadastrarFinanceiroSchema),
  });

  async function handleCadastrar({
    financeiroDescricaoId,
    valor,
  }: CadastrarFinanceiroCommand) {
    await cadastrar({
      valor: Number(String(valor).replaceAll(".", "").replace(",", ".")),
      financeiroDescricaoId: Number(financeiroDescricaoId),
      servicoId: Number(id),
    });

    await listar(id);
  }

  const columns: TableColumn<any>[] = [
    {
      name: "Data Hora",
      selector: ({ dataHora }) => new Date(dataHora).toLocaleString(),
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ financeiroDescricao }) => financeiroDescricao.descricao,
      sortable: true,
    },
    {
      name: "Valor",
      selector: ({ valor }) => formatarDinheiro(valor),
      sortable: true,
    },
  ];

  return (
    <>
      <ModalCadastro
        errors={errors}
        setShow={setShow}
        show={show}
        register={register}
        handleSubmit={handleSubmit(handleCadastrar)}
        financeiroDescricao={financeiroDescricoes}
      />
      <Row>
        <Col md={8}>
          <h4>Financeiro</h4>
        </Col>
        <Col>
          <Row>
            <Col className="flex">
              <Button className="mr-2" size="sm" onClick={() => setShow(true)}>
                Lançar
              </Button>
              <Button size="sm" onClick={() => comanda(id)}>
                Imprimir
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns}
        data={financeiros}
        paginationRowsPerPageOptions={[5, 10]}
        paginationPerPage={10}
      />
    </>
  );
}
