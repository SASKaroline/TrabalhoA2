const express = require('express');
const router = express.Router();

const ProdutoModel = require('../models/ProdutoModel');
const { validarProduto, validarAtualizacaoProduto } = require('../validators/ProdutoValidator');
const { validarId } = require('../validators/IDValidator');

router.get('/produtos', async (req, res) => {
  const produtos = await ProdutoModel.find().populate(['categoria']);
  res.json(produtos);
});

router.get('/produtos/:id', validarId, async (req, res) => {
  const produto = await ProdutoModel.findById(req.params.id).populate(['categoria']);
  if (!produto) {
    return res.status(404).json({ error: 'produto não encontrado' });
  }
  res.json(produto);
});

router.post('/produtos', validarProduto, async (req, res) => {
  const novoproduto = await ProdutoModel.create(req.body);
  res.status(201).json(novoproduto);
});

router.put('/produtos/:id', validarId, validarAtualizacaoProduto, async (req, res) => {
  const produtoAtualizado = await ProdutoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!produtoAtualizado) {
    return res.status(404).json({ error: 'produto não encontrado' });
  }
  res.json(produtoAtualizado);
});

router.delete('/produtos/:id', validarId, async (req, res) => {
  const produtoDeletado = await ProdutoModel.findByIdAndDelete(req.params.id);
  if (!produtoDeletado) {
    return res.status(404).json({ error: 'produto não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;