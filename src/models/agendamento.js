const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    data: { type: Date, required: true, min: Date.now },
    hora: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pendente', 'confirmado', 'concluido', 'cancelado'],
    default: 'pendente' },
    
    Pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pets',
      required: true
    },
    servico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servicos',
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    }
},
  { timestamps: true }
);

module.exports = mongoose.model('Agendamentos', schema);