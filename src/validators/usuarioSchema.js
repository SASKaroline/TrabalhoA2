const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;


const cpfRegex = /^\d{11}$/;

const CriarUsuarioSchema = yup.object().shape({
  nome: yup
    .string()
    .trim()
    .required("nome é obrigatório"),

  cpf: yup
    .string()
    .trim()
    .required("cpf é obrigatório")
    .matches(cpfRegex, "cpf deve conter 11 dígitos numéricos"),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("email inválido")
    .required("email é obrigatório"),

  senha: yup
    .string()
    .required("senha é obrigatória")
    .min(6, "senha deve ter no mínimo 6 caracteres"),

  telefone: yup
    .string()
    .trim()
    .nullable(),

  papel: yup
    .string()
    .required("papel é obrigatório")
    .oneOf(["cliente", "admin"], "papel deve ser cliente ou admin"),

  dataNascimento: yup
    .date()
    .required("dataNascimento é obrigatória")
    .max(new Date(), "dataNascimento não pode ser no futuro"),

  
  usuarioCriadoPor: yup
    .string()
    .nullable()
    .matches(objectIdRegex, "usuarioCriadoPor deve ser um ObjectId válido"),

  endereco: yup.object().shape({
    cep: yup.string().nullable(),
    logradouro: yup.string().nullable(),
    numero: yup.string().nullable(),
    complemento: yup.string().nullable(),
    bairro: yup.string().nullable(),
    cidade: yup.string().nullable(),
    uf: yup
      .string()
      .nullable()
      .max(2, "uf deve ter 2 caracteres (ex: 'SP')")
  })
});

const AtualizarUsuarioSchema = yup.object().shape({
  nome: yup.string().trim(),

  cpf: yup
    .string()
    .trim()
    .matches(cpfRegex, "cpf deve conter 11 dígitos numéricos"),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("email inválido"),

  senha: yup
    .string()
    .min(6, "senha deve ter no mínimo 6 caracteres"),

  telefone: yup.string().trim(),

  papel: yup
    .string()
    .oneOf(["cliente", "admin"], "papel deve ser cliente ou admin"),

  dataNascimento: yup
    .date()
    .max(new Date(), "dataNascimento não pode ser no futuro"),

  usuarioCriadoPor: yup
    .string()
    .nullable()
    .matches(objectIdRegex, "usuarioCriadoPor deve ser um ObjectId válido"),

  endereco: yup.object().shape({
    cep: yup.string().nullable(),
    logradouro: yup.string().nullable(),
    numero: yup.string().nullable(),
    complemento: yup.string().nullable(),
    bairro: yup.string().nullable(),
    cidade: yup.string().nullable(),
    uf: yup.string().nullable().max(2, "uf deve ter 2 caracteres")
  })
});


function validarCriacao(req, res, next) {
  CriarUsuarioSchema
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
  AtualizarUsuarioSchema
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
