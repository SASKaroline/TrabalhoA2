const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express')
const app = express()
app.use(express.json())
// conexão com o banco de dados
const mongoose = require('mongoose')

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
const AgendamentoController = require('./controllers/AgendamentoController');
app.use(AgendamentoController);

const avaliacaoController = require('./controllers/avaliacaoController');
app.use(avaliacaoController);

const CategoriaController = require('./controllers/CategoriaController');
app.use(CategoriaController);

const ItemPedidoController = require('./controllers/ItemPedidoController');
app.use(ItemPedidoController);

const PagamentoController = require('./controllers/PagamentoController');
app.use(PagamentoController);

const PedidoController = require('./controllers/PedidoController');
app.use(PedidoController);

const PetController = require('./controllers/PetController');
app.use(PetController);

const ProdutoController = require('./controllers/ProdutoController');
app.use(ProdutoController);

const ServicoController = require('./controllers/ServicoController');
app.use(ServicoController);

const UsuarioController = require('./controllers/UsuarioController');
app.use(UsuarioController);

app.listen(3000, () => {
  console.log("E-commerce Petshop Rodando em http://localhost:3000")
})
