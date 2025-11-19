const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const METODOS = ['pix', 'cartao', 'transferencia', 'boleto', 'paypal'];
const STATUS = ['pendente', 'aprovado', 'recusado', 'reembolsado'];

const criarPagamentoSchema = yup.object().shape({
  pedido: yup
    .string()
    .required('pedido é obrigatório')
    .matches(objectIdRegex, 'pedido deve ser um ObjectId válido'),

  valor: yup
    .number()
    .typeError('valor deve ser um número')
    .required('valor é obrigatório')
    .min(0.01, 'valor mínimo é 0.01'),

  metodo: yup
    .string()
    .required('metodo é obrigatório')
    .oneOf(METODOS, `metodo inválido — opções: ${METODOS.join(', ')}`),

  status: yup
    .string()
    .oneOf(STATUS, `status inválido — opções: ${STATUS.join(', ')}`)
    .default('pendente'),

  dataPagamento: yup
    .date()
    .typeError('dataPagamento deve ser uma data válida')
    .nullable()
    .notRequired()
});

const atualizarPagamentoSchema = yup.object().shape({
  pedido: yup
    .string()
    .matches(objectIdRegex, 'pedido deve ser um ObjectId válido'),

  valor: yup
    .number()
    .typeError('valor deve ser um número')
    .min(0.01, 'valor mínimo é 0.01'),

  metodo: yup
    .string()
    .oneOf(METODOS, `metodo inválido — opções: ${METODOS.join(', ')}`),

  status: yup
    .string()
    .oneOf(STATUS, `status inválido — opções: ${STATUS.join(', ')}`),

  dataPagamento: yup
    .date()
    .typeError('dataPagamento deve ser uma data válida')
    .nullable()
    .notRequired()
});


function validarCriacao(req, res, next) {
  criarPagamentoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length ? err.inner.map(e => e.message) : [err.message];
      return res.status(400).json({ errors });
    });
}

function validarAtualizacao(req, res, next) {
  atualizarPagamentoSchema
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
