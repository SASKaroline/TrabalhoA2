const express = require('express');
const router = express.Router();

const itensPedido = require('../models/item');
const { validarCriacao, validarAtualizacao } = require('../validators/itemPedidoSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os itens
router.get('/itens', async (req, res) => {
  const itens = await itensPedido.find().populate(['Pedido' , 'Produto' , 'Serviço']);
  res.json(itens);
});

// GET - buscar item por ID
router.get('/itens/:id', validarId, async (req, res) => {
  const item = await itensPedido
    .findById(req.params.id).populate(['Pedido' , 'Produto' , 'Serviço']);

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.json(item);
});

// POST - criar novo item
router.post('/itens', validarCriacao, async (req, res) => {
  const novoItem = await itensPedido.create(req.body);
  res.status(201).json(novoItem);
});

// PUT - atualizar item existente
router.put('/itens/:id', validarId, validarAtualizacao, async (req, res) => {
  const itemAtualizado = await itensPedido.findByIdAndUpdate(
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
  const itemDeletado = await ItensPedido.findByIdAndDelete(req.params.id);

  if (!itemDeletado) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
