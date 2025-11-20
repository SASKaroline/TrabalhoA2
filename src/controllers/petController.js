const express = require('express');
const router = express.Router();

const Pets = require('../models/pet');
const { validarCriacao, validarAtualizacao } = require('../validators/petSchema');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os pets
router.get('/pets', async (req, res) => {
  const pets = await Pets.find().populate(['Usuario', 'Agendamentos']);
  res.json(pets);
});

// GET - buscar pet por ID
router.get('/pets/:id', validarId, async (req, res) => {
  const pet = await Pets
    .findById(req.params.id).populate(['Usuario', 'Agendamentos']);

  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  res.json(pet);
});

// POST - criar novo pet
router.post('/pets', validarCriacao, async (req, res) => {
  const novoPet = await Pets.create(req.body);
  res.status(201).json(novoPet);
});

// PUT - atualizar pet existente
router.put('/pets/:id', validarId, validarAtualizacao, async (req, res) => {
  const petAtualizado = await Pets.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!petAtualizado) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  res.json(petAtualizado);
});

// DELETE - deletar pet
router.delete('/pets/:id', validarId, async (req, res) => {
  const petDeletado = await Pets.findByIdAndDelete(req.params.id);

  if (!petDeletado) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
