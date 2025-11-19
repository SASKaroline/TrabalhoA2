const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const criarAvaliacaoSchema = yup.object().shape({
  nota: yup
    .number()
    .typeError('nota deve ser um número')
    .required('nota é obrigatória')
    .min(1, 'nota mínima é 1')
    .max(5, 'nota máxima é 5'),

  comentario: yup
    .string()
    .trim()
    .min(1, 'comentario não pode ser vazio')
    .required('comentario é obrigatório'),

  data: yup
    .date()
    .typeError('data deve ser uma data válida')
    .default(() => new Date())  
});

const atualizarAvaliacaoSchema = yup.object().shape({
  nota: yup
    .number()
    .typeError('nota deve ser um número')
    .min(1, 'nota mínima é 1')
    .max(5, 'nota máxima é 5'),

  comentario: yup.string().trim().min(1, 'comentario não pode ser vazio'),

  data: yup
    .date()
    .typeError('data deve ser uma data válida')
});



function validarCriacao(req, res, next) {
  criarAvaliacaoSchema
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
  atualizarAvaliacaoSchema
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
