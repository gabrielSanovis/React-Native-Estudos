import { obtemLeiloes } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes.js");

const mockLeiloes = {
  id: "1",
  nome: "leilão",
  descricao: "sobre o leilão",
};

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
  it("Deve retorna uma lista de leilões", async () => {
    apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));
    const leiloes = await obtemLeiloes();
    expect(leiloes).toEqual(mockLeiloes);
  });
  it("Deve retornar uma lista de leilões vazia", async () => {
    apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
    const leiloes = await obtemLeiloes();
    expect(leiloes).toEqual([]);
  });
});
