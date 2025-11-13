const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do .env ou 3000

app.get('/', (req, res) => {
  res.send('API do PetShop Online funcionando!');
});


require('dotenv').config(); // Carrega o .env
const express = require('express');
const connectDB = require('./config/database'); // Importa sua conexão

// Conecta ao banco de dados
connectDB();

// (Middleware para o Express entender JSON)
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API do PetShop Online funcionando!');
});

// TODO: Adicionar as rotas (ex: app.use('/api/usuarios', rotasDeUsuarios))

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});