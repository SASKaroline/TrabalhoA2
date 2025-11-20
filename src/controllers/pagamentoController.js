const express = require('express');
const router = express.Router();

const PagamentoModel = require('../models/PagamentoModel');
const { validarPagamento, validarAtualizacaoPagamento} = require('../validators/PagamentoValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os pagamentos
router.get('/pagamentos', async (req, res) => {
  const pagamentos = await PagamentoModel.find().populate(['usuario', 'pedido', 'agendamento']);

  res.json(pagamentos);
});

// GET - buscar pagamento por ID
router.get('/pagamentos/:id', validarId, async (req, res) => {
  const pagamento = await PagamentoModel
    .findById(req.params.id).populate(['usuario', 'pedido', 'agendamento']);

  if (!pagamento) {
    return res.status(404).json({ error: 'Pagamento não encontrado' });
  }

  res.json(pagamento);
});

// POST - criar novo pagamento
router.post('/pagamentos', validarPagamento, async (req, res) => {
  const novoPagamento = await PagamentoModel.create(req.body);
  res.status(201).json(novoPagamento);
});

// PUT - atualizar pagamento existente
router.put('/pagamentos/:id', validarId, validarAtualizacaoPagamento, async (req, res) => {
  const pagamentoAtualizado = await PagamentoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!pagamentoAtualizado) {
    return res.status(404).json({ error: 'Pagamento não encontrado' });
  }

  res.json(pagamentoAtualizado);
});

// DELETE - deletar pagamento
router.delete('/pagamentos/:id', validarId, async (req, res) => {
  const pagamentoDeletado = await PagamentoModel.findByIdAndDelete(req.params.id);

  if (!pagamentoDeletado) {
    return res.status(404).json({ error: 'Pagamento não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
