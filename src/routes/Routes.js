'use strict';
const express = require('express');

const router = express.Router();
// const login = require('../middleware/login');
// const logs = require('../middleware/logs');
// const uploadimg = require('../middleware/uploadFoto');


//STATUS  API
router.get('/', (req, res) => { res.status(200).send({ message: 'acacio-api executando com sucesso.' }) });

//CONTAS
const boletos = require('../controllers/contas/boletos');
router.post('/boletos', boletos.GetBoletos);

module.exports = {
    routes: router
}
