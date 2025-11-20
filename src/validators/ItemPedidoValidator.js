const { default: mongoose } = require('mongoose');
const yup = require('yup');

const ItemPedidoSchema = yup.object().shape({
  quantidade: yup
    .number()
    .typeError('quantidade deve ser um número')
    .min(1, 'quantidade deve ser no mínimo 1')
    .required('quantidade é obrigatória'),
  precoUnitario: yup
    .number()
    .typeError('precoUnitario deve ser um número')
    .min(0, 'precoUnitario não pode ser negativo'),

  subtotal: yup
    .number()
    .typeError('subtotal deve ser um número')
    .min(0, 'subtotal não pode ser negativo')
    .required('subtotal é obrigatório'),

  pedido: yup.string()
    .required('pedidoId é obrigatório')
    .test(
      'idValidator',
      'ID de pedido inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  produto: yup.string()
    .required('produtoId é obrigatório')
    .test(
      'idValidator',
      'ID de produto inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  servico: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de serviço inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarItemPedido(req, res, next) {
  ItemPedidoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];

      return res.status(400).json({ errors });
    });
}


const ItemPedidoAtualizacaoSchema = yup.object().shape({
  quantidade: yup
    .number()
    .typeError('quantidade deve ser um número')
    .min(1, 'quantidade deve ser no mínimo 1'),
  precoUnitario: yup
    .number()
    .typeError('precoUnitario deve ser um número')
    .min(0, 'precoUnitario não pode ser negativo'),

  subtotal: yup
    .number()
    .typeError('subtotal deve ser um número')
    .min(0, 'subtotal não pode ser negativo'),

  pedido: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pedido inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  produto: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de produto inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  servico: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de serviço inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoItemPedido(req, res, next) {
  ItemPedidoAtualizacaoSchema
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
  validarItemPedido,
  validarAtualizacaoItemPedido
};
