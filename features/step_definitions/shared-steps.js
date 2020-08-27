const Mensagem = require('../../src/app/models/Mensagem');
const app = require('../../src/app');
const request = require("supertest");

let resposta;

export const dadoQueExisteAlgoCriado = (Dado) => {
  Dado("que existe {int} {string} criada", async  (quantidade, modelo) => {
    for(var count=0; count < quantidade; count++){
      switch(modelo) {
        case 'Mensagem':
          await Mensagem.create({nomeRemetente: `Nome teste ${i}`, texto: `Texto de Teste ${i}`});
          break;
        default:
          console.log(`Não temos implementado o modelo ${modelo}`);
      };
    };
  });
};

export const quandoClienteSolicita = (Quando) => {
  Quando("o cliente solicita {string} {string}", async (url, método) => {
    switch(método) {
      case 'GET':
        resposta = await request(app).get(url);
        break;
      default:
        console.log(`Não temos implementado o método ${método}`);
    };
  });
};

export const entãoStatusDeveSer = (Então) => {
  Então("o status deve ser {string}", (status) => {
    expect(resposta.status).toBe(status);
  });
};

export const entãoStatusDeveRetornarLista = (Então) => {
  Então("deve retornar uma lista com {int} {string}", (quantidade, modelo) => {
    switch(modelo) {
      case 'Mensagem':
        for(var count=0; count < quantidade; count++){
          expect(resposta.body).toContain(`Nome teste ${i}`);
          expect(resposta.body).toContain(`Texto de Teste ${i}`);
        }
        break;
      default:
        console.log(`Não temos implementado o modelo ${modelo}`);
    };
  });
};

export const quandoClienteSolicitaParametros = (Quando) => {
  Quando("o cliente solicita {string} {string} com {string}", async (url, método, params) => {
    switch(método) {
      case 'POST':
        resposta = await request(app).post(url).send(params);
        break;
      default:
        console.log(`Não temos implementado o método ${método}`);
    };
  });
};

export const entãoDeveRetornar = (Então) => {
  Então("deve retornar um {string}", (elemento) => {
    switch(elemento) {
      case 'Mensagem':
        expect(resposta.body).toContain(`Nome teste`);
        expect(resposta.body).toContain(`Texto de Teste`);
        break;
      default:
        console.log(`Não temos implementado o elemento ${elemento}`);
    };
  });
};