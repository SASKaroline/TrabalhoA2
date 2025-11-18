const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },

    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produtos',
      required: true
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categorias', schema);