const router = require('express').Router();
const MensagemController = require('../controllers/api/v1/MensagensController');

router.get('/', (request, response) => {
  response.send('Hello world');
});

router.get('/rotas', (request, response) => {
  rotas = []
  router.stack.forEach(l => rotas.push({path: l.route.path, method: l.route.methods}));
  response.json(rotas);
});

// MENSAGENS
router.get('/api/v1/mensagens', MensagemController.index);
router.post('/api/v1/mensagens', MensagemController.create);


module.exports = router;