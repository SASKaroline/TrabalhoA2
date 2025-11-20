const { default: mongoose } = require('mongoose');
const yup = require('yup');

const PetSchema = yup.object().shape({
  nome: yup
    .string()
    .required('nome é obrigatório'),

  especie: yup
    .string()
    .required('espécie é obrigatória'),

  raca: yup
    .string()
    .required('raça é obrigatória'),

  idade: yup
    .number()
    .typeError('idade deve ser um número')
    .min(0, 'idade não pode ser negativa')
    .required('idade é obrigatória'),

  peso: yup
    .number()
    .typeError('peso deve ser um número')
    .min(0, 'peso não pode ser negativo')
    .required('peso é obrigatório'),

  usuario: yup.string()
    .required('usuario é obrigatório')
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarPet(req, res, next) {
  PetSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

const PetAtualizacaoSchema = yup.object().shape({
  nome: yup.string(),

  especie: yup.string(),

  raca: yup.string(),

  idade: yup
    .number()
    .typeError('idade deve ser um número')
    .min(0, 'idade não pode ser negativa'),

  peso: yup
    .number()
    .typeError('peso deve ser um número')
    .min(0, 'peso não pode ser negativo'),

  usuario: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de usuario inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoPet(req, res, next) {
  PetAtualizacaoSchema
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
  validarPet,
  validarAtualizacaoPet
};