const express = require('express');
const router = express.Router();

const itemModel = require('../models/item');
const { validarItem, validarAtualizacaoItem } = require('../validators/itemPedidoSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os itens
router.get('/itens', async (req, res) => {
  const itens = await itemModel.find().populate(['Pedido' , 'Produto' , 'Serviço']);
  res.json(itens);
});

// GET - buscar item por ID
router.get('/itens/:id', validarId, async (req, res) => {
  const item = await itemModel
    .findById(req.params.id).populate(['Pedido' , 'Produto' , 'Serviço']);

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.json(item);
});

// POST - criar novo item
router.post('/itens', criarPedidoSchema, async (req, res) => {
  const novoItem = await itemModel.create(req.body);
  res.status(201).json(novoItem);
});

// PUT - atualizar item existente
router.put('/itens/:id', validarId, atualizarPedidoSchema, async (req, res) => {
  const itemAtualizado = await itemModel.findByIdAndUpdate(
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
  const itemDeletado = await itemModel.findByIdAndDelete(req.params.id);

  if (!itemDeletado) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
