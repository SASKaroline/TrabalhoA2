
const express = require('express')
const app = express()


app.use(express.json())

// conexão com o banco de dados
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao MongoDB")
  })
  .catch(err => {
    console.log("Erro ao conectar no banco MongoDB: ", err)
  })

// rotas
const agendamentoController = require('./controllers/agendamentoController');
app.use(agendamentoController);

const avaliacaoController = require('./controllers/avaliacaoController');
app.use(avaliacaoController);

const categoriaController = require('./controllers/categoriaController');
app.use(categoriaController);

const itemPedidoController = require('./controllers/itemPedidoController');
app.use(itemPedidoController);

const pagamentoController = require('./controllers/pagamentoController');
app.use(pagamentoController);

const pedidoController = require('./controllers/pedidoController');
app.use(pedidoController);

const petController = require('./controllers/petController');
app.use(petController);

const produtoController = require('./controllers/produtoController');
app.use(produtoController);

const servicoController = require('./controllers/servicoController');
app.use(servicoController);

const usuarioController = require('./controllers/usuarioController');
app.use(usuarioController);

app.listen(3000, () => {
  console.log("E-commerce Petshop Rodando em http://localhost:3000")
})
