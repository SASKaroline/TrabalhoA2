const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true, enum: ['Banho', 'Tosa', 'Consulta Veterinaria', 'Vacinacao'] },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true, min: 0.01 },
    duracao: { type: Number, required: true, min: 20  },
    
    agendamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agendamentos',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Servicos', schema);