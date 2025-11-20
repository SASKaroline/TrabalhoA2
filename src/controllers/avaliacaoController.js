const express = require('express');
const router = express.Router();

const AvaliacaoModel = require('../models/AvaliacaoModel');
const { validarAvaliacao, validarAtualizacaoAvaliacao } = require('../validators/AvaliacaoValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todas as avaliações
router.get('/avaliacoes', async (req, res) => {
  const avaliacoes = await AvaliacaoModel.find().populate(['usuario', 'servico', 'produto']);
  res.json(avaliacoes);
});

// GET - buscar avaliação por ID
router.get('/avaliacoes/:id', validarId, async (req, res) => {
  const avaliacao = await AvaliacaoModel
    .findById(req.params.id)
    .populate(['usuario', 'servico', 'produto']);

  if (!avaliacao) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }

  res.json(avaliacao);
});

// POST - criar nova avaliação
router.post('/avaliacoes', validarAvaliacao, async (req, res) => {
  const novaAvaliacao = await AvaliacaoModel.create(req.body);
  res.status(201).json(novaAvaliacao);
});

// PUT - atualizar avaliação existente
router.put('/avaliacoes/:id', validarId, validarAtualizacaoAvaliacao, async (req, res) => {
  const avaliacaoAtualizada = await AvaliacaoModel.findByIdAndUpdate(
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
  const avaliacaoDeletada = await AvaliacaoModel.findByIdAndDelete(req.params.id);

  if (!avaliacaoDeletada) {
    return res.status(404).json({ error: 'Avaliação não encontrada' });
  }

  res.status(204).send();
});

module.exports = router;
