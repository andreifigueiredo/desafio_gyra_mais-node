import {
  dadoQueExisteAlgoCriado,
  quandoClienteSolicita,
  entãoStatusDeveSer,
  entãoStatusDeveRetornarLista,
  quandoClienteSolicitaParametros,
  entãoDeveRetornar
} from './shared-steps'

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('../specifications/Mensagem.feature');

defineFeature(feature, (test) => {
  test('Procuro todas as mensagens do chat com mensagem criada.', ({Dado, Quando, Então }) => {
    dadoQueExisteAlgoCriado(Dado);

    quandoClienteSolicita(Quando);

    entãoStatusDeveSer(Então);

    entãoStatusDeveRetornarLista(Então);
  });

  test('Procuro todas as mensagens do chat sem mensagem criada.', ({Dado, Quando, Então }) => {
    dadoQueExisteAlgoCriado(Dado);

    quandoClienteSolicita(Quando);

    entãoStatusDeveSer(Então);

    entãoStatusDeveRetornarLista(Então);
  });

  test('Crio uma nova mensagem com dados validos.', ({Quando, Então }) => {
    quandoClienteSolicitaParametros(Quando);

    entãoStatusDeveSer(Então);

    entãoDeveRetornar(Então);
  });

  test('Crio uma nova mensagem com dados invalidos.', ({Quando, Então }) => {
    quandoClienteSolicitaParametros(Quando);

    entãoStatusDeveSer(Então);

    entãoDeveRetornar(Então);
  });
});