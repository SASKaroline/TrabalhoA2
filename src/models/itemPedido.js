const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    quantidade: { type: Number, required: true, min: 1 },
    precoUnitario: {type: Number, required: true, min: 0.01},
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
        type: Schema.Types.ObjectId,
        ref: 'Servico',
        required: false 
    }
  },
  { timestamps: true }
);
schema.pre('save', function(next) {
    if (this.isModified('quantidade') || this.isModified('precoUnitario')) {
        this.subtotal = this.quantidade * this.precoUnitario;
    }
    next();
});

module.exports = mongoose.model('itensPedido', schema);