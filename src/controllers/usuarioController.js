const express = require('express');
const router = express.Router();

const Usuarios = require('../models/usuario');
const { validarCriacao, validarAtualizacao } = require('../validators/');
const { validarId } = require('../validators/IDValidator');


router.get('/usuarios', async (req, res) => {
  const usuarios = await Usuarios.find().populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  res.json(usuarios);
});

router.get('/usuarios/:id', validarId, async (req, res) => {
  const usuario = await Usuarios.findById(req.params.id).populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  if (!usuario) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.json(usuario);
});

router.post('/usuarios', validarCriacao, async (req, res) => {
  const novousuario = await Usuarios.create(req.body);
  res.status(201).json(novousuario);
});

router.put('/usuarios/:id', validarId, validarAtualizacao, async (req, res) => {
  const usuarioAtualizado = await Usuarios.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!usuarioAtualizado) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.json(usuarioAtualizado);
});

router.delete('/usuarios/:id', validarId, async (req, res) => {
  const usuarioDeletado = await Usuarios.findByIdAndDelete(req.params.id);
  if (!usuarioDeletado) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;