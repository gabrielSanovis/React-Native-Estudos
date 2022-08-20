import { formataBrasileiroParaDecimal,formataDecimalParaReal } from "../../../src/negocio/formatadores/moeda";

describe("neogicio/formatadores/moeda", () => {
  describe("Função formataBrasileiroParaDecimal", () => {
    it('Deve retornar 8.59 quando o valor for "8,59"', () => {
      const resultado = formataBrasileiroParaDecimal("8,59");
      expect(resultado).toBe(8.59);
    });
  });

  describe("Função formataDecimalParaReal" , () => {
    it("Deve retornar 8,59 quando o valor for '8.59'", () => {
        const resultado = formataDecimalParaReal(8.59)
        expect(resultado).toMatch(/R\$\s8,59/)
    })
  })

});
