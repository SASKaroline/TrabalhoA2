const { default: mongoose } = require('mongoose');
const yup = require('yup');

const AgendamentoSchema = yup.object().shape({
  data: yup
    .date()
    .typeError('data deve ser uma data válida')
    .min(new Date(), 'data não pode estar no passado')
    .required('data é obrigatória'),

  hora: yup.number()
    .typeError('hora deve ser um número')
    .min(0, 'hora deve ser entre 0 e 23')
    .max(23, 'hora deve ser entre 0 e 23')
    .required('hora é obrigatória'),

  status: yup
    .string()
    .oneOf(['pendente', 'confirmado', 'concluido', 'cancelado'], 'status inválido')
    .required('status é obrigatório'),

  pet: yup.string()
    .required('O pet é obrigatório')
    .test(
      'idValidator',
      'ID de pet inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  servico: yup.string()
    .required('O servico que será realizado é obrigatório')
    .test(
      'idValidator',
      'ID de servico inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  usuario: yup.string()
    .required('O usuario é obrigatório')
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAgendamento(req, res, next) {
  AgendamentoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

const agendamentoSchemaAtualizacao = yup.object().shape({
  data: yup.date()
    .typeError('data deve ser uma data válida')
    .min(new Date(), 'data não pode estar no passado'),

  hora: yup.number()
    .typeError('hora deve ser um número')
    .min(0, 'hora deve ser entre 0 e 23')
    .max(23, 'hora deve ser entre 0 e 23'),

  status: yup.string()
    .oneOf(['pendente', 'confirmado', 'concluido', 'cancelado'], 'status inválido'),

  pet: yup.string()
    .test(
      'idValidator',
      'ID de pet inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  servico: yup.string()
    .test(
      'idValidator',
      'ID de servico inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  usuario: yup.string()
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoAgendamento(req, res, next) {
  agendamentoSchemaAtualizacao
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
  validarAgendamento,
  validarAtualizacaoAgendamento
};