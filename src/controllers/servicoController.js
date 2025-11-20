const express = require('express');
const router = express.Router();

const ServicoModel = require('../models/ServicoModel');
const { validarServico, validarAtualizacaoServico } = require('../validators/ServicoValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os serviços
router.get('/servicos', async (req, res) => {
  const servicos = await ServicoModel.find().populate(['agendamento']);
  res.json(servicos);
});

// GET - buscar serviço por ID
router.get('/servicos/:id', validarId, async (req, res) => {
  const servico = await ServicoModel
    .findById(req.params.id).populate(['agendamento']);

  if (!servico) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }

  res.json(servico);
});

// POST - criar novo serviço
router.post('/servicos', validarServico, async (req, res) => {
  const novoServico = await ServicoModel.create(req.body);
  res.status(201).json(novoServico);
});

// PUT - atualizar serviço existente
router.put('/servicos/:id', validarId, validarAtualizacaoServico, async (req, res) => {
  const servicoAtualizado = await ServicoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!servicoAtualizado) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }

  res.json(servicoAtualizado);
});

// DELETE - deletar serviço
router.delete('/servicos/:id', validarId, async (req, res) => {
  const servicoDeletado = await ServicoModel.findByIdAndDelete(req.params.id);

  if (!servicoDeletado) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
