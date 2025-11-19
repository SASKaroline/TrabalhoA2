const yup = require('yup');


const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const criarCategoriaSchema = yup.object().shape({
  nome: yup
    .string()
    .required('nome é obrigatório')
    .trim(),

  descricao: yup
    .string()
    .required('descricao é obrigatória'),

  produto: yup
    .string()
    .matches(objectIdRegex, 'produto deve ser um ObjectId válido')
    .required('produto é obrigatório')
});

const atualizarCategoriaSchema = yup.object().shape({
  nome: yup.string().trim(),

  descricao: yup.string(),

  produto: yup
    .string()
    .matches(objectIdRegex, 'produto deve ser um ObjectId válido')
});

function validarCriacao(req, res, next) {
  criarCategoriaSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

function validarAtualizacao(req, res, next) {
  atualizarCategoriaSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

module.exports = {
  validarCriacao,
  validarAtualizacao
};
