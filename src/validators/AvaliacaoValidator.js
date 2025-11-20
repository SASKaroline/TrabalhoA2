const { default: mongoose } = require('mongoose');
const yup = require('yup');

const AvaliacaoSchema = yup.object().shape({
  nota: yup
    .number()
    .typeError('nota deve ser um número')
    .min(1, 'a nota mínima é 1')
    .max(5, 'a nota máxima é 5')
    .required('nota é obrigatória'),

  comentario: yup
    .string()
    .nullable(),

  data: yup
    .date()
    .typeError('data deve ser uma data válida')
    .required('data é obrigatória'),

  usuario: yup.string()
    .required('O usuario é obrigatório')
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),

  produto: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de produto inválido',
      value => (value ? mongoose.Types.ObjectId.isValid(value) : true)
    ),

  servico: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de servico inválido',
      value => (value ? mongoose.Types.ObjectId.isValid(value) : true)
    )
})
.test(
  'produtoOuServico',
  'É obrigatório informar produto ou serviço',
  value => !!value.produto || !!value.servico
);

function validarAvaliacao(req, res, next) {
  AvaliacaoSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];

      return res.status(400).json({ errors });
    });
}

const AvaliacaoAtualizacaoSchema = yup.object().shape({
  nota: yup
    .number()
    .typeError('nota deve ser um número')
    .min(1, 'a nota mínima é 1')
    .max(5, 'a nota máxima é 5'),

  comentario: yup.string().nullable(),

  data: yup
    .date()
    .typeError('data deve ser uma data válida'),

  usuario: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => (value ? mongoose.Types.ObjectId.isValid(value) : true)
    ),

  produto: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de produto inválido',
      value => (value ? mongoose.Types.ObjectId.isValid(value) : true)
    ),

  servico: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de servico inválido',
      value => (value ? mongoose.Types.ObjectId.isValid(value) : true)
    )
})
.test(
  'produtoOuServico',
  'É obrigatório informar produto ou serviço',
  value => {
    if (!value) return true;
    return value.produto || value.servico;
  }
);

function validarAtualizacaoAvaliacao(req, res, next) {
  AvaliacaoAtualizacaoSchema
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
  validarAvaliacao,
  validarAtualizacaoAvaliacao
};