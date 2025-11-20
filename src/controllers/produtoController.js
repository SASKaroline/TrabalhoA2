const express = require('express');
const router = express.Router();

const Produtos = require('../models/produto');
const { validarCriacao, validarAtualizacao } = require('../validators/produtoSchema');
const { validarId } = require('../validators/IDValidator');

router.get('/produtos', async (req, res) => {
  const produtos = await Produtos.find().populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  res.json(produtos);
});

router.get('/produtos/:id', validarId, async (req, res) => {
  const produto = await Produtos.findById(req.params.id).populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  if (!produto) {
    return res.status(404).json({ error: 'produto não encontrado' });
  }
  res.json(produto);
});

router.post('/produtos', validarCriacao, async (req, res) => {
  const novoproduto = await Produtos.create(req.body);
  res.status(201).json(novoproduto);
});

router.put('/produtos/:id', validarId, validarAtualizacao, async (req, res) => {
  const produtoAtualizado = await Produtos.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!produtoAtualizado) {
    return res.status(404).json({ error: 'produto não encontrado' });
  }
  res.json(produtoAtualizado);
});

router.delete('/produtos/:id', validarId, async (req, res) => {
  const produtoDeletado = await Produtos.findByIdAndDelete(req.params.id);
  if (!produtoDeletado) {
    return res.status(404).json({ error: 'produto não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;