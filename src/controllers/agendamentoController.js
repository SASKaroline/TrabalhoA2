const express = require('express');
const router = express.Router();

const DepartamentoModel = require('../models/agendamento');
const { validarId } = require('../validations/agendamentoSchema');
const { validarAgendamento, validarAgendamentoAtualizacao } = require('../validations/agendamentoSchema');