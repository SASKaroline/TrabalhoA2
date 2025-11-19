const yup = require("yup");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const criarPetsSchema = yup.object().shape({

  nome: yup
    .string()
    .required("nome é obrigatório"),

  especie: yup
    .string()
    .required("especie é obrigatória"),

  raca: yup
    .string()
    .default("Nao informada"),

  idade: yup
    .number()
    .typeError("idade deve ser um número")
    .required("idade é obrigatória")
    .min(0, "idade mínima é 0"),

  peso: yup
    .number()
    .typeError("peso deve ser um número")
    .required("peso é obrigatório")
    .min(0.1, "peso mínimo é 0.1"),

});

const atualizarPetsSchema = yup.object().shape({

  nome: yup.string(),

  especie: yup.string(),

  raca: yup.string(),

  idade: yup
    .number()
    .typeError("idade deve ser um número")
    .min(0, "idade mínima é 0"),

  peso: yup
    .number()
    .typeError("peso deve ser um número")
    .min(0.1, "peso mínimo é 0.1"),

  usuario: yup
    .string()
    .matches(objectIdRegex, "usuario deve ser um ObjectId válido"),
});

function validarCriacao(req, res, next) {
    criarPetsSchema
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
    atualizarPetsSchema
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
  