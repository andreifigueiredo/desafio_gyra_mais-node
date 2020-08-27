const {servidor} = require('./app');

const porta = process.env.PORTA || 3000;
const hambiente = process.env.HAMBIENTE || "desenvolvimento";

servidor.listen(porta, () => {
  console.log(`Servidor rodando no hambiente de ${hambiente} na porta ${porta} com envs: PORTA= ${process.env.PORTA}, HAMBIENTE= ${process.env.HAMBIENTE}, MONGO_URL= ${process.env.MONGO_URL} `);
});

