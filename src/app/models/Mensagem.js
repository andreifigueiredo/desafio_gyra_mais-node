const { model, Schema } = require('../configs/mongo');

const mensagemSchema = new Schema({
  nomeRemetente: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('Mensagem', mensagemSchema)