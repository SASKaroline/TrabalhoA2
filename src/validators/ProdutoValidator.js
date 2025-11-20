const { default: mongoose } = require('mongoose');
const yup = require('yup');

// -------- SCHEMA DE CRIAÇÃO --------
const ProdutoSchema = yup.object().shape({
  nome: yup
    .string()
    .required('nome é obrigatório'),

  descricao: yup
    .string()
    .required('descrição é obrigatória'),

  preco: yup
    .number()
    .typeError('preço deve ser um número')
    .min(0, 'preço não pode ser negativo')
    .required('preço é obrigatório'),

  estoque: yup
    .number()
    .typeError('estoque deve ser um número')
    .min(0, 'estoque não pode ser negativo')
    .required('estoque é obrigatório'),

  categoria: yup.string()
    .required('categoria é obrigatória')
    .test(
      'idValidator',
      'ID de categoria inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarProduto(req, res, next) {
  ProdutoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

// -------- SCHEMA DE ATUALIZAÇÃO --------
const ProdutoAtualizacaoSchema = yup.object().shape({
  nome: yup.string(),

  descricao: yup.string(),

  preco: yup
    .number()
    .typeError('preço deve ser um número')
    .min(0, 'preço não pode ser negativo'),

  estoque: yup
    .number()
    .typeError('estoque deve ser um número')
    .min(0, 'estoque não pode ser negativo'),

  categoria: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de categoria inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoProduto(req, res, next) {
  ProdutoAtualizacaoSchema
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
  validarProduto,
  validarAtualizacaoProduto
};