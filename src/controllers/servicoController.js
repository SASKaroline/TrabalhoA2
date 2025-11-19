const express = require('express');
const router = express.Router();

const servicoModel = require('../models/servico');
const { validarServico, validarAtualizacaoServico } = require('../validators/servicoSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os serviços
router.get('/servicos', async (req, res) => {
  const servicos = await servicoModel.find().populate(['Categoria', 'Funcionario']);
  res.json(servicos);
});

// GET - buscar serviço por ID
router.get('/servicos/:id', validarId, async (req, res) => {
  const servico = await servicoModel
    .findById(req.params.id).populate(['Categoria', 'Funcionario']);

  if (!servico) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }

  res.json(servico);
});

// POST - criar novo serviço
router.post('/servicos', criarServicoSchema, async (req, res) => {
  const novoServico = await servicoModel.create(req.body);
  res.status(201).json(novoServico);
});

// PUT - atualizar serviço existente
router.put('/servicos/:id', validarId, atualizarServicoSchema, async (req, res) => {
  const servicoAtualizado = await servicoModel.findByIdAndUpdate(
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
  const servicoDeletado = await servicoModel.findByIdAndDelete(req.params.id);

  if (!servicoDeletado) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
