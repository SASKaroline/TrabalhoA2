const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const criarProdutoSchema = yup.object().shape({
  nome: yup
    .string()
    .trim()
    .required('nome é obrigatório'),

  descricao: yup
    .string()
    .required('descricao é obrigatória'),

  preco: yup
    .number()
    .typeError('preco deve ser um número')
    .required('preco é obrigatório')
    .min(0.1, 'preco mínimo é 0.1'),

  estoque: yup
    .number()
    .typeError('estoque deve ser um número')
    .required('estoque é obrigatório')
    .min(0, 'estoque mínimo é 0'),

  imagem: yup
    .string()
    .required('imagem é obrigatória'),

  categoria: yup
    .string()
    .required('categoria é obrigatória')
    .matches(objectIdRegex, 'categoria deve ser um ObjectId válido')
});

const atualizarProdutoSchema = yup.object().shape({
  nome: yup.string().trim().notRequired(),

  descricao: yup.string().notRequired(),

  preco: yup
    .number()
    .typeError('preco deve ser um número')
    .min(0.1, 'preco mínimo é 0.1')
    .notRequired(),

  estoque: yup
    .number()
    .typeError('estoque deve ser um número')
    .min(0, 'estoque mínimo é 0')
    .notRequired(),

  imagem: yup.string().notRequired(),

  categoria: yup
    .string()
    .matches(objectIdRegex, 'categoria deve ser um ObjectId válido')
    .notRequired()
});

function validarCriacao(req, res, next) {
  criarProdutoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

function validarAtualizacao(req, res, next) {
  atualizarProdutoSchema
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
  validarCriacao,
  validarAtualizacao
};
