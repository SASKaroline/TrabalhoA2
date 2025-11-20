const express = require('express');
const router = express.Router();

const UsuarioModel = require('../models/UsuarioModel');
const { validarUsuario, validarAtualizacaoUsuario } = require('../validators/UsuarioValidator');
const { validarId } = require('../validators/IDValidator');


router.get('/usuarios', async (req, res) => {
  const usuarios = await Usuarios.find().populate(['pet', 'pedido' , 'avaliacao' , 'pagamento']);
  res.json(usuarios);
});

router.get('/usuarios/:id', validarId, async (req, res) => {
  const usuario = await UsuarioModel.findById(req.params.id).populate(['pet', 'pedido' , 'avaliacao' , 'pagamento']);
  if (!usuario) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.json(usuario);
});

router.post('/usuarios', validarUsuario, async (req, res) => {
  const novousuario = await UsuarioModel.create(req.body);
  res.status(201).json(novousuario);
});

router.put('/usuarios/:id', validarId, validarAtualizacaoUsuario, async (req, res) => {
  const usuarioAtualizado = await UsuarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!usuarioAtualizado) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.json(usuarioAtualizado);
});

router.delete('/usuarios/:id', validarId, async (req, res) => {
  const usuarioDeletado = await UsuarioModel.findByIdAndDelete(req.params.id);
  if (!usuarioDeletado) {
    return res.status(404).json({ error: 'usuario não encontrado' });
  }
  res.status(204).send();
});

module.exports = router;