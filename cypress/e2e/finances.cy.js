describe('Transações', () => {

  // hooks -> trechos de cogisgos q pode ser excutado antes e depois / de cada teste
  // before -> uma vez antes de todos os testes
  // after -> uma vez despois de todos os testes
  // beforeEach -> antes de cada testes
  // afterEach -> depois de cada testes


    beforeEach(() => {
      cy.visit('https://devfinance-agilizei.netlify.app/#')
    });

  it('Cadastrar uma entrada', () => {
      criarTransacao("Freela", 250)
  
    cy.get("tbody tr td.description").should("have.text", "Freela")
  });

  it('Cadastrar uma saída', () => {
      criarTransacao("Cinema", -45)
 
    cy.get("tbody tr td.description").should("have.text", "Cinema")

  });
  it('Excluir transação',() => {
    criarTransacao("Freela", 100)
    criarTransacao("Mesada", 10)

    cy.contains(".description", "Freela") // td -> referendia 
    .parent() //tr -> pai "linha"
    .find('img') // imagem 
    .click()

    cy.get('tbody tr').should("have.length", 1)

  })
});

function criarTransacao(descricao, valor){
    cy.contains("Nova Transação").click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-15")//ano - mês - dia

    cy.contains('button', 'Salvar').click()

}
