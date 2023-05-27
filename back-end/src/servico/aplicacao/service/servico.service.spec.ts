import { Test } from '@nestjs/testing';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Servico } from 'src/servico/dominio/model/servico.model';
import { ServicoModelo } from 'src/servico/dominio/model/servicoModelo.model';
import { Readable } from 'stream';
import { DocumentoService } from '../../../core/documentos/documento.service';
import { ServiceRepository } from '../../infra/repository/mySql/servico.repository';
import { ServicoService } from './servico.service';

const modeloMock: ServicoModelo = {
  dataHora: new Date(),
  id: 1,
  nome: 'teste',
};

const servicoMock: Servico = {
  clienteNome: 'nome',
  clienteNumero: '123',
  dataHora: new Date(),
  excluido: 0,
  id: 1,
  imei: '123',
  orcamento: new Decimal(123),
  servicoModeloId: 1,
  servicoModelo: {
    dataHora: new Date(),
    id: 1,
    nome: 'teste',
  },
};

describe('ServicoService', () => {
  let servicoService: ServicoService;
  let servicoRepository: ServiceRepository;
  let documentoService: DocumentoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ServicoService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: DocumentoService,
          useValue: {
            gerarDocumento: jest.fn().mockResolvedValue(Buffer.from('asd')),
          },
        },
        {
          provide: ServiceRepository,
          useValue: {
            listarModelos: jest.fn().mockResolvedValue([modeloMock]),
            buscarModelo: jest.fn().mockResolvedValue(modeloMock),
            cria: jest.fn().mockResolvedValue(servicoMock),
            listar: jest.fn().mockResolvedValue([servicoMock]),
            buscar: jest.fn().mockResolvedValue(servicoMock),
            cadastroModelo: jest.fn().mockResolvedValue(modeloMock),
            atualizar: jest.fn().mockResolvedValue(servicoMock),
          },
        },
      ],
    }).compile();

    servicoService = moduleRef.get<ServicoService>(ServicoService);
    documentoService = moduleRef.get<DocumentoService>(DocumentoService);
    servicoRepository = moduleRef.get<ServiceRepository>(ServiceRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('Deve criar class', () => {
    expect(servicoService).toBeDefined();
  });

  describe('listarModelos', () => {
    it('Deve listar os serviços modelos', async () => {
      const resultado = await servicoService.listarModelos({});
      expect(resultado).toEqual([modeloMock]);
    });
  });

  describe('buscarModelo', () => {
    it('Deve buscar um modelo', async () => {
      const resultado = await servicoService.buscarModelo({ id: 1 });
      expect(resultado).toEqual(modeloMock);
    });

    it('Se não encontrar deve retornar Exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'buscarModelo')
          .mockReturnValueOnce(Promise.resolve(false));
        await servicoService.buscarModelo({ id: 1 });
      } catch (error) {
        expect(error.message).toEqual('Modelo não encontrado');
      }
    });
  });

  describe('cadastro', () => {
    it('Deve cadastrar um serviço', async () => {
      const resultado = await servicoService.cadastro({
        clienteNome: 'nome',
        clienteNumero: '123',
        orcamento: new Decimal(123),
        servicoModeloId: 1,
      });

      expect(resultado).toEqual(servicoMock);
    });

    it('Caso ocorra algum erro deve retornar exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'cria')
          .mockReturnValueOnce(Promise.resolve(false));
        await servicoService.cadastro({
          clienteNome: 'nome',
          clienteNumero: '123',
          orcamento: new Decimal(123),
          servicoModeloId: 1,
        });
      } catch (error) {
        expect(error.message).toEqual(
          'Ocorreu um erro ao cadastrar um novo serviço',
        );
      }
    });
  });

  describe('listar', () => {
    it('Deve listar serviços', async () => {
      const resultado = await servicoService.listar({});
      expect(resultado).toEqual([servicoMock]);
    });
  });

  describe('buscar', () => {
    it('Deve buscar um serviço', async () => {
      const resultado = await servicoService.buscar({ id: 1 });
      expect(resultado).toEqual(servicoMock);
    });

    it('Caso não encontre deve retornar exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'buscar')
          .mockReturnValueOnce(Promise.resolve(false));
        await servicoService.buscar({ id: 1 });
      } catch (error) {
        expect(error.message).toEqual('Serviço não encontrado');
      }
    });
  });

  describe('garantia', () => {
    it('Deve gerar garantia', async () => {
      const resultado = await servicoService.garantia(1);
      expect(resultado).toBeInstanceOf(Buffer);
    });

    it('Deve gerar garantia sem imei', async () => {
      jest
        .spyOn(servicoRepository, 'buscar')
        .mockReturnValueOnce(Promise.resolve({ ...servicoMock, imei: null }));
      const resultado = await servicoService.garantia(1);
      expect(resultado).toBeInstanceOf(Buffer);
    });
  });

  describe('cadastroModelo', () => {
    it('Deve cadastrar servico modelo', async () => {
      const resultado = await servicoService.cadastroModelo({
        nome: 'teste',
      });
      expect(resultado).toEqual(modeloMock);
    });

    it('Se ocorrer algum erro deve retornar exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'cadastroModelo')
          .mockReturnValueOnce(Promise.resolve(false));

        await servicoService.cadastroModelo({
          nome: 'teste',
        });
      } catch (error) {
        expect(error.message).toEqual(
          'Ocorreu um erro ao cadastrar serviço modelo',
        );
      }
    });
  });

  describe('atualizar', () => {
    it('Deve atualizar um serviço', async () => {
      const resultado = await servicoService.atualizar({
        id: 1,
      });

      expect(resultado).toEqual(servicoMock);
    });

    it('Se ocorrer um erro deve retornar exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'atualizar')
          .mockReturnValueOnce(Promise.resolve(false));

        await servicoService.atualizar({
          id: 1,
        });
      } catch (error) {
        expect(error.message).toEqual('Ocorreu um erro ao atualizar');
      }
    });
  });

  describe('finalizar', () => {
    it('Deve finalizar serviço', async () => {
      const resultado = await servicoService.finalizar({
        id: 1,
        tipoPagamento: 'pix',
      });

      expect(resultado).toEqual(servicoMock);
    });

    it('Se ocorre um erro deve retornar exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'atualizar')
          .mockReturnValueOnce(Promise.resolve(false));

        await servicoService.finalizar({
          id: 1,
          tipoPagamento: 'pix',
        });
      } catch (error) {
        expect(error.message).toEqual('Ocorreu um erro ao atualizar');
      }
    });
  });

  describe('excluir', () => {
    it('Deve excluir um processo', async () => {
      const resultado = await servicoService.excluir(1);
      expect(resultado).toEqual(servicoMock);
    });

    it('Se ocorre um erro deve retornar exception', async () => {
      try {
        jest
          .spyOn(servicoRepository, 'atualizar')
          .mockReturnValueOnce(Promise.resolve(false));

        await servicoService.finalizar({
          id: 1,
          tipoPagamento: 'pix',
        });
      } catch (error) {
        expect(error.message).toEqual('Ocorreu um erro ao atualizar');
      }
    });
  });
});
