import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

const lances = [{valor: 100},{valor: 200},{valor: 300},{valor: 400},{valor: 500},];


describe('negocio/formatadores/lance', () => {
    describe('Função formataMaiorLanceDoLeilao', () => {
        it("Deve retornar somente o maior lance", () => {
            const resultado = formataMaiorLanceDoLeilao(lances, 20);
            expect(resultado).toBe(500)
        })
    })
})