const yup = require('yup');

const criarPedidoSchema = yup.object().shape({
  
  total: yup
    .number()
    .typeError('total deve ser um número')
    .required('total é obrigatório')
    .min(0.01, 'total mínimo é 0.01'),

  status: yup
    .string()
    .required('status é obrigatório')
    .oneOf(
      ['novo', 'pago', 'enviado', 'entregue', 'cancelado'],
      'status inválido'
    ),

  dataPedido: yup
    .date()
    .typeError('dataPedido deve ser uma data válida')
    .default(() => new Date())
});

const atualizarPedidoSchema = yup.object().shape({

    total: yup
      .number()
      .typeError('total deve ser um número')
      .min(0.01, 'total mínimo é 0.01')
      .notRequired(),
  
    status: yup
      .string()
      .oneOf(
        ['novo', 'pago', 'enviado', 'entregue', 'cancelado'],
        'status inválido'
      )
      .notRequired(),
  
    dataPedido: yup
      .date()
      .typeError('dataPedido deve ser uma data válida')
      .notRequired()
  });

  function validarCriacao(req, res, next) {
    criarPedidoSchema
      .validate(req.body, { abortEarly: false })
      .then(() => next())
      .catch(err => {
        const errors = err.inner?.length ? err.inner.map(e => e.message) : [err.message];
        return res.status(400).json({ errors });
      });
  }
  
  function validarAtualizacao(req, res, next) {
    atualizarPedidoSchema
      .validate(req.body, { abortEarly: false })
      .then(() => next())
      .catch(err => {
        const errors = err.inner?.length ? err.inner.map(e => e.message) : [err.message];
        return res.status(400).json({ errors });
      });
  }
  
  module.exports = {
    validarCriacao,
    validarAtualizacao
  };
  