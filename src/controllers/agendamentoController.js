const express = require('express');
const router = express.Router();

const AgendamentoModel = require('../models/AgendamentoModel');
const { validarAgendamento, validarAtualizacaoAgendamento } = require('../validators/AgendamentoValidator');
const { validarId } = require('../validators/IDValidator');

router.get('/agendamentos', async (req, res) => {
  const agendamentos = await AgendamentoModel.find().populate(['pet', 'servico' , 'usuario']);
  res.json(agendamentos);
});

router.get('/agendamentos/:id', validarId, async (req, res) => {
  const agendamento = await AgendamentoModel.findById(req.params.id).populate(['pet', 'servico' , 'usuario']);
  if (!agendamento) {
    return res.status(404).json({ error: 'agendamento não encontrado' });
  }
  res.json(agendamento);
});

router.post('/agendamentos', validarAgendamento, async (req, res) => {
  const novoAgendamento = await AgendamentoModel.create(req.body);
  res.status(201).json(novoAgendamento);
});

router.put('/agendamentos/:id', validarId, validarAtualizacaoAgendamento, async (req, res) => {
  const agendamentoAtualizado = await AgendamentoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!agendamentoAtualizado) {
    return res.status(404).json({ error: 'agendamento não encontrado' });
  }
  res.json(agendamentoAtualizado);
});

router.delete('/agendamentos/:id', validarId, async (req, res) => {
  const agendamentoDeletado = await AgendamentoModel.findByIdAndDelete(req.params.id);
  if (!agendamentoDeletado) {
    return res.status(404).json({ error: 'agendamento não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;