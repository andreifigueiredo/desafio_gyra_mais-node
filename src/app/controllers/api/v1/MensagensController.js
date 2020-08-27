const Mensagem = require('../../../models/Mensagem');

class MensagemController {
  async index(request, response) {
    try {
      const mensagens = await Mensagem.find().sort({createdAt: 1});

      return response.status(200).json({mensagens: mensagens});
    } catch(error) {
      return response.status(422).json(error);
    };
  };

  async create(request, response) {
    try {
      const mensagem = await Mensagem.create(request.body);

      request.io.sockets.emit('novaMensagem', {mensagem: mensagem});

      return response.status(201).json({mensagem: mensagem});
    } catch(error) {
      return response.status(422).json(error);
    };
  };
};

module.exports = new MensagemController(); 