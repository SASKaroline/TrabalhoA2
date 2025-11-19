const yup = require('yup');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const criarPedidoSchema = yup.object().shape({
  
  total: yup
    .number()
    .typeError('total deve ser um número')
    .required('total é obrigatório')
    .min(0.01, 'total mínimo é 0.01'),

  status: yup
    .string()
    .required('status é obrigatório')
    .oneOf(
      ['novo', 'pago', 'enviado', 'entregue', 'cancelado'],
      'status inválido'
    ),

  dataPedido: yup
    .date()
    .typeError('dataPedido deve ser uma data válida')
    .default(() => new Date())
});

const atualizarPedidoSchema = yup.object().shape({

    total: yup
      .number()
      .typeError('total deve ser um número')
      .min(0.01, 'total mínimo é 0.01')
      .notRequired(),
  
    status: yup
      .string()
      .oneOf(
        ['novo', 'pago', 'enviado', 'entregue', 'cancelado'],
        'status inválido'
      )
      .notRequired(),
  
    dataPedido: yup
      .date()
      .typeError('dataPedido deve ser uma data válida')
      .notRequired()
  });
  