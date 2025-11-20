const { default: mongoose } = require('mongoose');
const yup = require('yup');

const STATUS = ['novo', 'pago', 'enviado', 'entregue', 'cancelado'];

const PedidoSchema = yup.object().shape({
  total: yup
    .number()
    .typeError('total deve ser um número')
    .min(0.01, 'total deve ser no mínimo 0.01')
    .required('total é obrigatório'),

  status: yup
    .string()
    .oneOf(STATUS, 'status inválido')
    .required('status é obrigatório'),

  dataPedido: yup
    .date()
    .typeError('dataPedido deve ser uma data válida')
    .nullable(), // pois o model coloca default, não precisa vir no body

  usuario: yup.string()
    .required('usuario é obrigatório')
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  itemPedido: yup.string()
    .required('itemPedido é obrigatório')
    .test(
      'idValidator',
      'ID de itemPedido inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarPedido(req, res, next) {
  PedidoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}


const PedidoAtualizacaoSchema = yup.object().shape({
  total: yup
    .number()
    .typeError('total deve ser um número')
    .min(0.01, 'total deve ser no mínimo 0.01'),

  status: yup
    .string()
    .oneOf(STATUS, 'status inválido'),

  dataPedido: yup
    .date()
    .typeError('dataPedido deve ser uma data válida'),

  usuario: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  itemPedido: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de itemPedido inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoPedido(req, res, next) {
  PedidoAtualizacaoSchema
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
  validarPedido,
  validarAtualizacaoPedido
};
