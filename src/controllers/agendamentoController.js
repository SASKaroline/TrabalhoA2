const express = require('express');
const router = express.Router();

const Agendamentos = require('../models/agendamento');
const { validarCriacao, validarAtualizacao } = require('../validators/agendamentoSchema');
const { validarId } = require('../validators/IDValidator');

router.get('/agendamentos', async (req, res) => {
  const agendamentos = await Agendamentos.find().populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  res.json(agendamentos);
});

router.get('/agendamentos/:id', validarId, async (req, res) => {
  const agendamento = await Agendamentos.findById(req.params.id).populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  if (!agendamento) {
    return res.status(404).json({ error: 'agendamento não encontrado' });
  }
  res.json(agendamento);
});

router.post('/agendamentos', validarCriacao, async (req, res) => {
  const novoAgendamento = await Agendamentos.create(req.body);
  res.status(201).json(novoAgendamento);
});

router.put('/agendamentos/:id', validarId, validarAtualizacao, async (req, res) => {
  const agendamentoAtualizado = await Agendamentos.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!agendamentoAtualizado) {
    return res.status(404).json({ error: 'agendamento não encontrado' });
  }
  res.json(agendamentoAtualizado);
});

router.delete('/agendamentos/:id', validarId, async (req, res) => {
  const agendamentoDeletado = await Agendamentos.findByIdAndDelete(req.params.id);
  if (!agendamentoDeletado) {
    return res.status(404).json({ error: 'agendamento não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;