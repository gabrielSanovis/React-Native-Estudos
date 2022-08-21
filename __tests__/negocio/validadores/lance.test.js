import {
  validaFormatoNumericoDoLance,
  validaLance,
} from "../../../src/negocio/validadores/lance";
import {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_OU_IGUAL_AOS_LANCES,
} from "../../../src/negocio/constantes/estadosLance";

const leilaoIniciado = {
  lances: [
    
  ],
  valorInicial: 400
};
const leilaoComLances = {
  lances: [
    { valor: 100 },
    { valor: 200 },
    { valor: 300 },
    { valor: 400 },
    { valor: 500 },
  ],
  valorInicial: 400
};
describe("../../../src/negocio/validadores/lance", () => {
  describe("Função validaFormatoNumericoDoLance", () => {
    it("Deve retornar Lance válido se eu passar 199,30", () => {
      const resultado = validaFormatoNumericoDoLance("199,30");
      expect(resultado).toBe(VALIDO);
    });

    it('Deve retornar Lance inválido, digite um valor como: "100" ou "99,99" se eu passar 199.30', () => {
      const resultado = validaFormatoNumericoDoLance("199.30");
      expect(resultado).toBe(INVALIDO);
    });
  });

  describe("Função validaLance", () => {
    it("Deve retornar 'Lance menor que o valor inicial' caso o lance ofertado for menor que o valor inicial do lance do leilão (o leilão não possui lances dandos anteriormente)", () => {
      const resultado = validaLance(200, leilaoIniciado);
      expect(resultado).toBe(MENOR_QUE_VALOR_INICIAL)
    });
    it("Deve retornar 'Lance menor que o maior lance já realizado' caso o lance ofertado for menor/igual que o maior lance do leilão", () => {
      const resultado = validaLance(499, leilaoComLances);
      expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES)
    });
    it("Deve retornar 'Lance válido' caso o lance ofertado ultrapasse o maior lance do leilão", () => {
      const resultado = validaLance(501, leilaoComLances);
      expect(resultado).toBe(VALIDO)
    });
  });
});
