const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const criarServicoSchema = yup.object().shape({
  nome: yup
    .string()
    .trim()
    .required("nome é obrigatório"),

  descricao: yup
    .string()
    .required("descricao é obrigatória"),

  preco: yup
    .number()
    .typeError("preco deve ser um número")
    .required("preco é obrigatório")
    .min(0.01, "preco mínimo é 0.01"),

  duracao: yup
    .number()
    .typeError("duracao deve ser um número")
    .required("duracao é obrigatória")
    .min(20, "duracao mínima é 20 minutos"),

  agendamento: yup
    .string()
    .required("agendamento é obrigatório")
    .matches(objectIdRegex, "agendamento deve ser um ObjectId válido")
});

const atualizarServicoSchema = yup.object().shape({
  nome: yup.string().trim(),

  descricao: yup.string(),

  preco: yup
    .number()
    .typeError("preco deve ser um número")
    .min(0.01, "preco mínimo é 0.01"),

  duracao: yup
    .number()
    .typeError("duracao deve ser um número")
    .min(20, "duracao mínima é 20"),

  agendamento: yup
    .string()
    .matches(objectIdRegex, "agendamento deve ser um ObjectId válido")
});

function validarCriacao(req, res, next) {
    criarServicoSchema
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
    atualizarServicoSchema
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
  