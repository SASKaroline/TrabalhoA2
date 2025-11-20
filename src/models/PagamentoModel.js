const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema(
  {
    valor: { type: Number, required: true, min: 0.01 },
    metodo: { type: String, required: true, enum : ['pix', 'cartao', 'transferencia', 'boleto', 'paypal']},
    status: { type: String, required: true, enum: ['pendente', 'aprovado', 'recusado', 'reembolsado'],
        default: 'pendente'},
    DataPagamento: { type: String, default: Date.now },
    
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pedidos',
      required: true,
      unique: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    agendamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'agendamentos',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pagamentos', PagamentoSchema);