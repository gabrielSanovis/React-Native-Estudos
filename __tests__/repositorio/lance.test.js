import { obtemLancesDoLeilao, adicionaLance } from "../../src/repositorio/lance";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes.js");

const mockLances = [
  {
    id: 1,
    valor: 10,
  },
  {
    id: 2,
    valor: 20,
  },
];

const mockRequisicao = async (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisicaoErro = async () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe("../../src/repositorio/lance", () => {

    beforeEach(() => {
        apiLeiloes.get.mockClear();
        apiLeiloes.post.mockClear();
    })

  describe("Função obtemLancesDoLeilao", () => {
    it("Deve retornar uma lista dos lances", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLances));
      const lances = await obtemLancesDoLeilao(1);
      expect(lances).toEqual(mockLances);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc')
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    });
    
    it("Deve retornar uma lista vazia", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
      const lances = await obtemLancesDoLeilao(1);
      expect(lances).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc')
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    });
  });

  describe("Função adicionaLance", () => {
    it("Deve retorna um lance", async () => {
        apiLeiloes.post.mockImplementation(() => mockRequisicao());
        const sucesso = await adicionaLance(mockLances[0]);
        expect(sucesso).toBe(true);
        expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLances[0]);
        expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
    });

    it("Deve retorna um objeto vazio", async () => {
        apiLeiloes.post.mockImplementation(() => mockRequisicaoErro());
        const falhou = await adicionaLance(mockLances[0]);
        expect(falhou).toBe(false);
        expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLances[0]);
        expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
    })
  })
});
