const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nota: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String, required: true },
    data: { type: Date, default: Date.now },
   
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
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
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Avaliacoes', schema);