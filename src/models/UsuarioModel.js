const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
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
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',
        required: false,
        default: null
    },
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pedidos',
        required: false,
        default: null
    },
    avaliacao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avaliacao',
        required: false,
        default: null
    },
    pagamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pagamentos',
        required: false,
        default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuarios', UsuarioSchema);