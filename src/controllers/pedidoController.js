const express = require('express');
const router = express.Router();

const PedidoModel = require('../models/PedidoModel');
const { validarPedido, validarAtualizacaoPedido} = require('../validators/PedidoValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os pedidos
router.get('/pedidos', async (req, res) => {
  const pedidos = await PedidoModel
    .find()
    .populate(['Usuario', 'ItemPedido']);

  res.json(pedidos);
});

// GET - buscar pedido por ID
router.get('/pedidos/:id', validarId, async (req, res) => {
  const pedido = await PedidoModel
    .findById(req.params.id)
    .populate(['Usuario', 'ItemPedido']);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  res.json(pedido);
});

// POST - criar novo pedido
router.post('/pedidos', validarPedido, async (req, res) => {
  const novoPedido = await PedidoModel.create(req.body);
  res.status(201).json(novoPedido);
});

// PUT - atualizar pedido existente
router.put('/pedidos/:id', validarId, validarAtualizacaoPedido, async (req, res) => {
  const pedidoAtualizado = await PedidoModel.findByIdAndUpdate(
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
  const pedidoDeletado = await PedidoModel.findByIdAndDelete(req.params.id);

  if (!pedidoDeletado) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
