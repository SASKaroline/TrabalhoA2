const yup = require('yup');

const CategoriaSchema = yup.object().shape({
  nome: yup
    .string()
    .required('nome da categoria é obrigatório'),

  descricao: yup
    .string()
    .nullable()
});

function validarCategoria(req, res, next) {
  CategoriaSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];

      return res.status(400).json({ errors });
    });
}

const CategoriaAtualizacaoSchema = yup.object().shape({
  nome: yup.string(),

  descricao: yup.string().nullable()
});

function validarAtualizacaoCategoria(req, res, next) {
  CategoriaAtualizacaoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];

      return res.status(400).json({ errors });
    });
}

module.exports = {
  validarCategoria,
  validarAtualizacaoCategoria
};
