const express = require('express');
const router = express.Router();

const ItemPedidoModel = require('../models/ItemPedidoModel');
const { validarItemPedido, validarAtualizacaoItemPedido } = require('../validators/ItemPedidoValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os itens
router.get('/itens', async (req, res) => {
  const itens = await ItemPedidoModel.find().populate(['pedido' , 'produto' , 'servico']);
  res.json(itens);
});

// GET - buscar item por ID
router.get('/itens/:id', validarId, async (req, res) => {
  const item = await ItemPedidoModel
    .findById(req.params.id).populate(['pedido' , 'produto' , 'servico']);

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.json(item);
});

// POST - criar novo item
router.post('/itens', validarItemPedido, async (req, res) => {
  const novoItem = await ItemPedidoModel.create(req.body);
  res.status(201).json(novoItem);
});

// PUT - atualizar item existente
router.put('/itens/:id', validarId, validarAtualizacaoItemPedido, async (req, res) => {
  const itemAtualizado = await ItemPedidoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!itemAtualizado) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.json(itemAtualizado);
});

// DELETE - deletar item
router.delete('/itens/:id', validarId, async (req, res) => {
  const itemDeletado = await ItemPedidoModel.findByIdAndDelete(req.params.id);

  if (!itemDeletado) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
