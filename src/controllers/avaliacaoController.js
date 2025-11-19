const express = require('express');
const router = express.Router();

const avaliacaoModel = require('../models/avaliacao');
const { validarAvaliacao, validarAtualizacaoAvaliacao } = require('../validators/avaliacaoSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todas as avaliações
router.get('/avaliacoes', async (req, res) => {
  const avaliacoes = await avaliacaoModel.find().populate(['Usuario', 'Servico', 'Produto']);
  res.json(avaliacoes);
});

// GET - buscar avaliação por ID
router.get('/avaliacoes/:id', validarId, async (req, res) => {
  const avaliacao = await avaliacaoModel
    .findById(req.params.id)
    .populate(['Usuario', 'Servico', 'Produto']);

  if (!avaliacao) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }

  res.json(avaliacao);
});

// POST - criar nova avaliação
router.post('/avaliacoes', criarAvaliacaoSchema, async (req, res) => {
  const novaAvaliacao = await avaliacaoModel.create(req.body);
  res.status(201).json(novaAvaliacao);
});

// PUT - atualizar avaliação existente
router.put('/avaliacoes/:id', validarId, atualizarAvaliacaoSchema, async (req, res) => {
  const avaliacaoAtualizada = await avaliacaoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!avaliacaoAtualizada) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }

  res.json(avaliacaoAtualizada);
});

// DELETE - deletar avaliação
router.delete('/avaliacoes/:id', validarId, async (req, res) => {
  const avaliacaoDeletada = await avaliacaoModel.findByIdAndDelete(req.params.id);

  if (!avaliacaoDeletada) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }

  res.status(204).send();
});

module.exports = router;
