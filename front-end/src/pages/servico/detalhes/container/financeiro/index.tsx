import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../../componets/modal";
import { Table } from "../../../../../componets/table";
import { formatarDinheiro } from "../../../../../core/utils/dinheiro";
import { CadastrarFinanceiroCommand } from "../../../../../hooks/financeiro/command/cadastrarServico.command";
import { cadastrarFinanceiroSchema } from "../../../../../hooks/financeiro/schema/cadastrarFinanceiro.schema";
import { useFinanceiro } from "../../../../../hooks/financeiro/useFinanceiro";
import { useFinanceiroDescricao } from "../../../../../hooks/financeiro/useFinanceiroDescricao";
import { ModalCadastro } from "./container/ModalCadastro";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

export function Financeiro({ id }: Props) {
  const { excluir, listar, financeiros, cadastrar, comanda } = useFinanceiro();
  const [show, setShow] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [excluirId, setExcluir] = useState<string>();
  const { listar: listarDescricao, financeiroDescricoes } =
    useFinanceiroDescricao();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastrarFinanceiroCommand>({
    resolver: yupResolver(cadastrarFinanceiroSchema),
  });

  useEffect(() => {
    listar(id);
    listarDescricao();
  }, []);

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

  async function baixarComanda() {
    const garantia = new Promise((res) => res(comanda(id)));

    toast.promise(garantia, {
      pending: "Aguarde",
    });
  }

  async function handleExcluir() {
    excluirId && (await excluir(excluirId));
    await listar(id);
    setExcluir("");
    setShowExcluir(false);
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
    {
      name: "Excluir",
      selector: ({ id }) => (
        <Button
          onClick={() => {
            setShowExcluir(true);
            setExcluir(id);
          }}
        >
          Excluir
        </Button>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Modal
        show={showExcluir}
        handleClose={() => setShowExcluir(!showExcluir)}
      >
        Essa ação é irreversível
        <Button onClick={handleExcluir}>Confirmar</Button>
      </Modal>

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
              <Button size="sm" onClick={baixarComanda}>
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
        pagination={true}
      />
    </>
  );
}
