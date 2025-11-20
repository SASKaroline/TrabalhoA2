const { default: mongoose } = require('mongoose');
const yup = require('yup');

const METODOS = ['pix', 'cartao', 'transferencia', 'boleto', 'paypal'];
const STATUS = ['pendente', 'aprovado', 'recusado', 'reembolsado'];

const PagamentoSchema = yup.object().shape({
  valor: yup
    .number()
    .typeError('valor deve ser um número')
    .min(0, 'valor não pode ser negativo')
    .required('valor é obrigatório'),

  metodo: yup
    .string()
    .oneOf(METODOS, 'método de pagamento inválido')
    .required('metodo é obrigatório'),

  status: yup
    .string()
    .oneOf(STATUS, 'status inválido')
    .required('status é obrigatório'),

  pedido: yup.string()
    .required('pedido é obrigatório')
    .test(
      'idValidator',
      'ID de pedido inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  usuario: yup.string()
    .required('usuario é obrigatório')
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarPagamento(req, res, next) {
  PagamentoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];

      return res.status(400).json({ errors });
    });
}

const PagamentoAtualizacaoSchema = yup.object().shape({
  valor: yup
    .number()
    .typeError('valor deve ser um número')
    .min(0, 'valor não pode ser negativo'),

  metodo: yup
    .string()
    .oneOf(METODOS, 'método de pagamento inválido'),

  status: yup
    .string()
    .oneOf(STATUS, 'status inválido'),

  pedido: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pedido inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  usuario: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoPagamento(req, res, next) {
  PagamentoAtualizacaoSchema
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
  validarPagamento,
  validarAtualizacaoPagamento
};