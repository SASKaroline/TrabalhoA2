const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;


const criarPedidoSchema = yup.object().shape({

  quantidade: yup
    .number()
    .typeError('quantidade deve ser um número')
    .required('quantidade é obrigatória')
    .min(1, 'quantidade mínima é 1'),

  precoUnitario: yup
    .number()
    .typeError('precoUnitario deve ser um número')
    .required('precoUnitario é obrigatório')
    .min(0.01, 'precoUnitario mínimo é 0.01'),

  subtotal: yup
    .number()
    .typeError('subtotal deve ser um número')
    .min(0.01, 'subtotal mínimo é 0.01')
    .notRequired()

});

const atualizarPedidoSchema = yup.object().shape({
  
  quantidade: yup
  .number()
  .typeError('quantidade deve ser um número')
  .required('quantidade é obrigatória')
  .min(1, 'quantidade mínima é 1'),

precoUnitario: yup
  .number()
  .typeError('precoUnitario deve ser um número')
  .required('precoUnitario é obrigatório')
  .min(0.01, 'precoUnitario mínimo é 0.01'),

subtotal: yup
  .number()
  .typeError('subtotal deve ser um número')
  .min(0.01, 'subtotal mínimo é 0.01')
  .notRequired()

});

function validarCriacao(req, res, next) {
  criarPedidoSchema
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
  atualizarPedidoSchema
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
