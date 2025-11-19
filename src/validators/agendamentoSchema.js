const yup = require('yup');

const criarAgendamentoSchema = yup.object().shape({

  data: yup
    .date()
    .typeError('data deve ser uma data válida')
    .min(new Date(), 'data não pode estar no passado')
    .required('data é obrigatória'),

  hora: yup
    .number()
    .typeError('hora deve ser um número')
    .min(0, 'hora deve ser entre 0 e 23')
    .max(23, 'hora deve ser entre 0 e 23')
    .required('hora é obrigatória'),

  status: yup
    .string()
    .oneOf(
      ['pendente', 'confirmado', 'concluido', 'cancelado'],
      'status inválido'
    )
    .required('status é obrigatório')
});

const atualizarAgendamentoSchema = yup.object().shape({
  
  data: yup
    .date()
    .typeError('data deve ser uma data válida')
    .min(new Date(), 'data não pode estar no passado'),

  hora: yup
    .number()
    .typeError('hora deve ser um número')
    .min(0, 'hora deve ser entre 0 e 23')
    .max(23, 'hora deve ser entre 0 e 23'),

  status: yup
    .string()
    .oneOf(
      ['pendente', 'confirmado', 'concluido', 'cancelado'],
      'status inválido'
    )
});



function validarCriacao(req, res, next) {
  criarAgendamentoSchema
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
  atualizarAgendamentoSchema
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
