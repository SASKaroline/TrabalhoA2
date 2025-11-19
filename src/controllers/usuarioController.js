const express = require('express');
const router = express.Router();

const usuarioModel = require('../models/usuario');
const { validarFuncionario, validarAtualizacaoFuncionario } = require('../validators/');
const { validarId } = require('../validators/IDValidator');


router.get('/usuarios', async (req, res) => {
  const usuarios = await usuarioModel.find().populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  res.json(usuarios);
});

router.get('/usuarios/:id', validarId, async (req, res) => {
  const usuario = await usuarioModel.findById(req.params.id).populate(['Pets', 'Pedidos' , 'Agendamentos' , 'Pagamentos']);
  if (!usuario) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.json(usuario);
});

router.post('/usuarios', CriarUsuarioSchema, async (req, res) => {
  const novousuario = await usuarioModel.create(req.body);
  res.status(201).json(novousuario);
});

router.put('/usuarios/:id', validarId, AtualizarUsuarioSchema, async (req, res) => {
  const usuarioAtualizado = await usuarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!usuarioAtualizado) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.json(usuarioAtualizado);
});

router.delete('/usuarios/:id', validarId, async (req, res) => {
  const usuarioDeletado = await usuarioModel.findByIdAndDelete(req.params.id);
  if (!usuarioDeletado) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;