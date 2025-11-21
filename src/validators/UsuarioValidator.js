const { default: mongoose } = require('mongoose');
const yup = require('yup');

const PAPEL = ['cliente', 'admin'];

const UsuarioSchema = yup.object().shape({
  nome: yup
    .string()
    .required('nome é obrigatório'),

  cpf: yup
    .string()
    .required('cpf é obrigatório'),

  email: yup
    .string()
    .email('email inválido')
    .required('email é obrigatório'),

  senha: yup
    .string()
    .required('senha é obrigatória'),

  telefone: yup
    .string()
    .nullable(),

  papel: yup
    .string()
    .oneOf(PAPEL, 'papel inválido')
    .required('papel é obrigatório'),

  dataNascimento: yup
    .date()
    .typeError('dataNascimento deve ser uma data válida')
    .required('dataNascimento é obrigatória'),

  endereco: yup.object({
    cep: yup.string().nullable(),
    logradouro: yup.string().nullable(),
    numero: yup.string().nullable(),
    complemento: yup.string().nullable(),
    bairro: yup.string().nullable(),
    cidade: yup.string().nullable(),
    uf: yup.string().nullable(),
  }).nullable(),

  pets: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pets inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  pedidos: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pedidos inválido',
       value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  avaliacoes: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de avaliacoes inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  pagamento: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pagamento inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarUsuario(req, res, next) {
  UsuarioSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const errors = err.inner?.length
        ? err.inner.map(e => e.message)
        : [err.message];
      return res.status(400).json({ errors });
    });
}

const UsuarioAtualizacaoSchema = yup.object().shape({
  nome: yup.string(),
  cpf: yup.string(),
  email: yup.string().email('email inválido'),
  senha: yup.string(),
  telefone: yup.string(),
  papel: yup.string().oneOf(PAPEL, 'papel inválido'),

  dataNascimento: yup
    .date()
    .typeError('dataNascimento deve ser uma data válida'),

  endereco: yup.object({
    cep: yup.string().nullable(),
    logradouro: yup.string().nullable(),
    numero: yup.string().nullable(),
    complemento: yup.string().nullable(),
    bairro: yup.string().nullable(),
    cidade: yup.string().nullable(),
    uf: yup.string().nullable(),
  }).nullable(),

  pets: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pets inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  pedidos: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pedidos inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  avaliacoes: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de avaliacoes inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),

  pagamento: yup.string()
    .nullable()
    .test(
      'idValidator',
      'ID de pagamento inválido',
      value => !value || mongoose.Types.ObjectId.isValid(value)
    ),
});

function validarAtualizacaoUsuario(req, res, next) {
  UsuarioAtualizacaoSchema
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
  validarUsuario,
  validarAtualizacaoUsuario
};