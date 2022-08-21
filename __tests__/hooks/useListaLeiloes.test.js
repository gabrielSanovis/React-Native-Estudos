import { renderHook, act } from "@testing-library/react-hooks";
import useListaLeiloes from "../../src/hooks/useListaLeiloes";
import {obtemLeiloes} from "../../src/repositorio/leilao"
 
jest.mock("../../src/repositorio/leilao");

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
];

const mockLeiloesAtualizada = [
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


describe("hooks/useListaLeiloes", () => {
  it("Deve retornar uma lista de leilõese uma função para atualizar", async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes)
    const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());
    expect(result.current[0]).toEqual([]);
    await waitForNextUpdate();
    expect(result.current[0]).toEqual(mockLeiloes);

    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada)
    await act(() => result.current[1]());
    expect(result.current[0]).toEqual(mockLeiloesAtualizada);
  });
});
