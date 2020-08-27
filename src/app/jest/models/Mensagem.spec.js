const Mensagem = require('../../models/Mensagem');

const dbHandler = require('../dbHandler');


describe("Testes de model de mensagem", () => {
  /**
   * Conecta com um novo banco de dados antes de iniciar qualquer teste.
   */
  beforeAll(async () => await dbHandler.connect());
  
  /**
   * Limpa todos os dados de testes depois de cada teste.
   */
  afterEach(async () => await dbHandler.clearDatabase());
  
  /**
   * Remove e fecha o banco e servidor 
   */
  afterAll(async () => await dbHandler.closeDatabase());
  
  it("Não deveria permitir criar um modelo de mensagem sem nomeRemetente", async () => {
    await expect(Mensagem.create({nomeRemetente: null, texto: "Texto de Teste"})).rejects.toThrow("Path `nomeRemetente` is required")
  });

  it("Não deveria permitir criar um modelo de mensagem sem texto", async () => {
    await expect(Mensagem.create({nomeRemetente: "Nome teste", texto: null})).rejects.toThrow("Path `texto` is required")
  });

  it("Deveria permitir criar um modelo de mensagem com dados validos", async () => {
    let novaMensagem = await Mensagem.create({nomeRemetente: "Nome teste", texto: "Texto de Teste"})
    
    expect(novaMensagem.nomeRemetente).toEqual("Nome teste");
    expect(novaMensagem.texto).toEqual("Texto de Teste");

    let mensagemCriada = await Mensagem.find({_id: novaMensagem.id});
    expect(mensagemCriada[0] == novaMensagem);
  });
});