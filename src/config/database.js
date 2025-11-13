const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis do .env

// Pega a string de conexão do .env
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Falha na conexão com o MongoDB:', error.message);
    // Encerra o processo com falha
    process.exit(1);
  }
};

module.exports = connectDB;