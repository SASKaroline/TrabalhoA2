const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categorias', CategoriaSchema);