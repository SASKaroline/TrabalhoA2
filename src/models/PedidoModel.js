const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema(
  {
    total: { type: Number, required: true, min: 0.01 },
    status: { type: String, required: true, enum: ['novo', 'pago', 'enviado', 'entregue', 'cancelado'], // Estados válidos do pedido
    default: 'novo' },
    dataPedido: { type: Date, default: Date.now },
    
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    itemPedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ItensPedido',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pedidos', PedidoSchema);