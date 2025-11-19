const express = require('express');
const router = express.Router();

const pagamentoModel = require('../models/pagamento');
const { validarPagamento, validarAtualizacaoPagamento } = require('../validators/pagamentoSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os pagamentos
router.get('/pagamentos', async (req, res) => {
  const pagamentos = await pagamentoModel.find().populate(['Usuario', 'Pedido', 'Agendamento']);

  res.json(pagamentos);
});

// GET - buscar pagamento por ID
router.get('/pagamentos/:id', validarId, async (req, res) => {
  const pagamento = await pagamentoModel
    .findById(req.params.id).populate(['Usuario', 'Pedido', 'Agendamento']);

  if (!pagamento) {
    return res.status(404).json({ error: 'Pagamento não encontrado' });
  }

  res.json(pagamento);
});

// POST - criar novo pagamento
router.post('/pagamentos', criarPagamentoSchema, async (req, res) => {
  const novoPagamento = await pagamentoModel.create(req.body);
  res.status(201).json(novoPagamento);
});

// PUT - atualizar pagamento existente
router.put('/pagamentos/:id', validarId, atualizarPagamentoSchema, async (req, res) => {
  const pagamentoAtualizado = await pagamentoModel.findByIdAndUpdate(
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
  const pagamentoDeletado = await pagamentoModel.findByIdAndDelete(req.params.id);

  if (!pagamentoDeletado) {
    return res.status(404).json({ error: 'Pagamento não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
