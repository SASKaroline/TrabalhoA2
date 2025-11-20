const express = require('express');
const router = express.Router();

const PetModel = require('../models/PetModel');
const { validarPet, validarAtualizacaoPet } = require('../validators/PetValidator');
const { validarId } = require('../validators/IDValidator');

// GET - listar todos os pets
router.get('/pets', async (req, res) => {
  const pets = await PetModel.find().populate(['usuario', 'agendamento']);
  res.json(pets);
});

// GET - buscar pet por ID
router.get('/pets/:id', validarId, async (req, res) => {
  const pet = await PetModel
    .findById(req.params.id).populate(['usuario', 'agendamento']);

  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  res.json(pet);
});

// POST - criar novo pet
router.post('/pets', validarPet, async (req, res) => {
  const novoPet = await PetModel.create(req.body);
  res.status(201).json(novoPet);
});

// PUT - atualizar pet existente
router.put('/pets/:id', validarId, validarAtualizacaoPet, async (req, res) => {
  const petAtualizado = await PetModel.findByIdAndUpdate(
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
  const petDeletado = await PetModel.findByIdAndDelete(req.params.id);

  if (!petDeletado) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  res.status(204).send();
});

module.exports = router;
