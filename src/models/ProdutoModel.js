const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true, default: 0,  min: 0.1 },
    estoque: { type: Number, required: true, min: 0 },
    imagem: { type: String, required: false },
    
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categorias',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produtos', ProdutoSchema);