const express = require('express');
const router = express.Router();

const CategoriaModel = require('../models/CategoriaModel');
const { validarCategoria, validarAtualizacaoCategoria } = require('../validators/CategoriaValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todas as categorias
router.get('/categorias', async (req, res) => {
  const categorias = await CategoriaModel.find();
  res.json(categorias);
});

// GET - buscar categoria por ID
router.get('/categorias/:id', validarId, async (req, res) => {
  const categoria = await CategoriaModel.findById(req.params.id);

  if (!categoria) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }

  res.json(categoria);
});

// POST - criar nova categoria
router.post('/categorias', validarCategoria, async (req, res) => {
  const novaCategoria = await CategoriaModel.create(req.body);
  res.status(201).json(novaCategoria);
});

// PUT - atualizar categoria existente
router.put('/categorias/:id', validarId, validarAtualizacaoCategoria, async (req, res) => {
  const categoriaAtualizada = await CategoriaModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!categoriaAtualizada) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }

  res.json(categoriaAtualizada);
});

// DELETE - deletar categoria
router.delete('/categorias/:id', validarId, async (req, res) => {
  const categoriaDeletada = await CategoriaModel.findByIdAndDelete(req.params.id);

  if (!categoriaDeletada) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }

  res.status(204).send();
});

module.exports = router;
