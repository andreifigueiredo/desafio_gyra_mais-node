require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rotas = require('./app/configs/rotas');

const app = express();
      servidor = require('http').createServer(app),
      io = require('socket.io')(servidor);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use((request, response, next) => {request.io = io; return next()});
app.use(rotas);

io.on('connection', socket => {
  socket.on('disconnect', async () => {
    socket.leaveAll();
  })
})

module.exports.app = app;
module.exports.servidor = servidor;