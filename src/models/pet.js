const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    especie: { type: String, required: true },
    raca: { type: String, required: true, default: 'Nao informada' },
    idade: { type: Number, required: true, min: 0 },
    peso: { type: Number, required: true, min: 0.1 },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pets', schema);