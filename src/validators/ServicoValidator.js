const { default: mongoose } = require('mongoose');
const yup = require('yup');

const NOMES_SERVICO = ['Banho', 'Tosa', 'Consulta Veterinaria', 'Vacinacao'];

const ServicoSchema = yup.object().shape({
  nome: yup
    .string()
    .oneOf(NOMES_SERVICO, 'nome de serviço inválido')
    .required('nome é obrigatório'),

  descricao: yup
    .string()
    .required('descrição é obrigatória'),

  preco: yup
    .number()
    .typeError('preço deve ser um número')
    .min(0.1, 'preço mínimo é 0.1')
    .required('preço é obrigatório'),

  duracao: yup
    .number()
    .typeError('duração deve ser um número (em minutos)')
    .min(20, 'duração mínima é 20 minutos')
    .required('duração é obrigatória'),

  agendamento: yup.string()
    .required('agendamento é obrigatório')
    .test(
      'idValidator',
      'ID de agendamento inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarServico(req, res, next) {
  ServicoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

const ServicoAtualizacaoSchema = yup.object().shape({
  nome: yup
    .string()
    .oneOf(NOMES_SERVICO, 'nome de serviço inválido'),

  descricao: yup.string(),

  preco: yup
    .number()
    .typeError('preço deve ser um número')
    .min(0.1, 'preço mínimo é 0.1'),

  duracao: yup
    .number()
    .typeError('duração deve ser um número (em minutos)')
    .min(20, 'duração mínima é 20 minutos'),

  agendamento: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de agendamento inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoServico(req, res, next) {
  ServicoAtualizacaoSchema
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
  validarServico,
  validarAtualizacaoServico
};