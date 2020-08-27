const supertest = require('supertest');
const http = require('http');
const {app} = require('../../../app');
const Mensagem = require('../../models/Mensagem');

const dbHandler = require('../dbHandler');

let servidor, request;

beforeAll((done) => {
  servidor = http.createServer(app);
  servidor.listen(done);
  request = supertest(servidor);
});

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

afterAll((done) => {
  servidor.close(done);
});

describe("Procuro todas as mensagens do chat com mensagem criada.", () => {
  let resposta;
  let mensagem;

  beforeEach( async () => {
    mensagem = await Mensagem.create({nomeRemetente: "Nome teste", texto: "Texto de teste"});
    resposta = await request.get("/api/v1/mensagens");
  });

  it("deve retornar o status correto", () => {
    expect(resposta.status).toEqual(200);
  });

  it("deve retornar uma lista com 1 mensagem", () => {
    expect(resposta.body.mensagens.length).toEqual(1);
  });
});

describe("Procuro todas as mensagens do chat sem mensagem criada.", () => {
  beforeEach( async () => {
    resposta = await request.get("/api/v1/mensagens");
  });
  
  it("deve retornar o status correto", () => {
    expect(resposta.status).toEqual(200);
  });

  it("deve retornar uma lista com 0 mensagem", () => {
    expect(resposta.body).toMatchObject({mensagens: []});
  });
});

describe("Crio uma nova mensagem com dados validos.", () => {
  beforeEach( async () => {
    resposta = await request.post("/api/v1/mensagens").send({nomeRemetente: "Nome teste", texto: "Texto de teste"});
  });
  
  it("deve retornar o status correto", () => {
    expect(resposta.status).toEqual(201);
  });

  it("deve retornar a mensagem criada", () => {
    expect(resposta.body.mensagem.nomeRemetente).toEqual("Nome teste");
    expect(resposta.body.mensagem.texto).toEqual("Texto de teste");
  });
});

describe("Crio uma nova mensagem com nomeRemetente invalido.", () => {
  beforeEach( async () => {
    resposta = await request.post("/api/v1/mensagens").send({nomeRemetente: null, texto: "Texto de teste"});
  });

  it("deve retornar o status correto", () => {
    expect(resposta.status).toEqual(422);
  });

  it("deve retornar um erro", () => {
    expect(resposta.body.message).toEqual("Mensagem validation failed: nomeRemetente: Path `nomeRemetente` is required.");
  });
});

describe("Crio uma nova mensagem com texto invalido.", () => {
  beforeEach( async () => {
    resposta = await request.post("/api/v1/mensagens").send({nomeRemetente: "Nome teste", texto: null});
  });

  it("deve retornar o status correto", () => {
    expect(resposta.status).toEqual(422);
  });

  it("deve retornar um erro", () => {
    expect(resposta.body.message).toEqual("Mensagem validation failed: texto: Path `texto` is required.");
  });
});