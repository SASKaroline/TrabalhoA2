const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    cpf: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, Lowercase: true, trim: true },
    senha: { type: String, required: true },
    telefone: { type: String, trim: true },
    papel: { type: String, required: true, enum: ['cliente', 'admin'], default: 'cliente' },
    dataCadastro: { type: Date, default: Date.now },
    dataNascimento: { type: Date, required: true },
    endereco: {
      cep: String,
      logradouro: String,
      numero: String,
      complemento: String,
      bairro: String,
      cidade: String,
      uf: String,
    },
    pets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',
        required: true
    },
    pedidos: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pedidos',
        required: true
    },
    avaliacoes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avaliacao',
        required: true
    },
    pagamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pagamentos',
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuarios', schema);