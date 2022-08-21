import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes.js");

const mockLeiloes = [
  {
    id: 1,
    nome: "TV",
    descricao: 'TV de LED 50"',
    valorInicial: 1000,
    icone: "tv",
    cor: "#ffba05",
  },
  {
    id: 2,
    nome: "Geladeira",
    descricao: "Geladeira 200 litros",
    valorInicial: 500,
    icone: "cheese",
    cor: "#6bd1ff",
  },
  {
    id: 3,
    nome: "Fogão",
    descricao: "Fogão 6 bocas",
    valorInicial: 800,
    icone: "fire",
    cor: "#f16165",
  },
  {
    id: 4,
    nome: "Microondas",
    descricao: "Microondas 34 litros",
    valorInicial: 1200,
    icone: "cube",
    cor: "#00c86f",
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

describe("../../src/repositorio/leilao", () => {
  beforeEach(() => {
    apiLeiloes.get.mockClear();
  });

  describe("Função obtemLeiloes", () => {
    it("Deve retorna uma lista de leilões", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual(mockLeiloes);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
    it("Deve retornar uma lista de leilões vazia", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("Função obtemLeilao", () => {
    it("Deve retorna um leilão", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes[0]));
      const leilao = await obtemLeilao(1);
      expect(leilao).toEqual(mockLeiloes[0]);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("Deve retorna um objeto vazio", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro(mockLeiloes[0]));
      const leilao = await obtemLeilao(1);
      expect(leilao).toEqual({});
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes/1");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });
});
