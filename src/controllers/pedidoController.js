const express = require('express');
const router = express.Router();

const pedidoModel = require('../models/pedido');
const { validarPedido, validarAtualizacaoPedido } = require('../validators/pedidoSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os pedidos
router.get('/pedidos', async (req, res) => {
  const pedidos = await pedidoModel
    .find()
    .populate(['Usuario', 'Itens', 'Pagamento', 'Servico', 'Pet']);

  res.json(pedidos);
});

// GET - buscar pedido por ID
router.get('/pedidos/:id', validarId, async (req, res) => {
  const pedido = await pedidoModel
    .findById(req.params.id)
    .populate(['Usuario', 'Itens', 'Pagamento', 'Servico', 'Pet']);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  res.json(pedido);
});

// POST - criar novo pedido
router.post('/pedidos', criarPedidoSchema, async (req, res) => {
  const novoPedido = await pedidoModel.create(req.body);
  res.status(201).json(novoPedido);
});

// PUT - atualizar pedido existente
router.put('/pedidos/:id', validarId, atualizarPedidoSchema, async (req, res) => {
  const pedidoAtualizado = await pedidoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!pedidoAtualizado) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  res.json(pedidoAtualizado);
});

// DELETE - deletar pedido
router.delete('/pedidos/:id', validarId, async (req, res) => {
  const pedidoDeletado = await pedidoModel.findByIdAndDelete(req.params.id);

  if (!pedidoDeletado) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
