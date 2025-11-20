const mongoose = require('mongoose');

const ItemPedidoSchema = new mongoose.Schema(
  {
    quantidade: { type: Number, required: true, min: 1 },
    precoUnitario: { type: Number, required: false, min: 0.01 },
    subtotal: { type: Number, required: true, min: 0.01 },

    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pedidos',
      required: true
    },

    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produtos',
      required: true
    },

    servico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servicos',
      required: false
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('ItensPedido', ItemPedidoSchema);
