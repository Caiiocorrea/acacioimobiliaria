'use strict';

const express = require('express');
const router = express.Router();
const logs = require('../middleware/logs');
const login = require('../middleware/login');
// const uploadimg = require('../middleware/uploadFoto');

const contaspagar = require('../controllers/contas/contasController');
const pagamentos = require('../controllers/getnet/PagamentosControllers');
const nfe = require('../controllers/notafiscal/NFeControllers');
const nfeopen = require('../controllers/notafiscal/NFeOpenControllers');
const manifestacaonfe = require('../controllers/notafiscal/ManifestacaoControllers');
const manifestacaocte = require('../controllers/cte/ManifestacaoControllers');

//******* // *********//

//STATUS  API
router.get('/', (req, res) => { res.status(200).send({ message: 'Hausz-api-financeiro executando com sucesso.' }) });

//CONTAS
router.get('/contas', login.required, contaspagar.GetContas);
router.get('/conta', login.required, contaspagar.GetByConta);
router.post('/conta', login.required, contaspagar.PostConta);
router.put('/conta/:_id', login.required, contaspagar.PutConta);
router.delete('/contas', login.required, contaspagar.DelConta);

//FOCUS NFe
router.get('/emitir', login.required, nfe.Emitir);
router.get('/consultar', login.required, nfe.Consultar);
router.get('/cancelar', login.required, nfe.Cancelar);
router.delete('/inutilizar', login.required, nfe.Inutilizar);
router.post('/cartacorrecao', login.required, nfe.CartaCorrecao);
router.post('/reenviaremail', login.required, nfe.ReenviarEmail);
router.post('/manifesto', login.required, manifestacaonfe.Manifesto);
router.get('/manifestacaonferecebidas', login.required, manifestacaonfe.ManifestacaoNFRecebidas);
router.get('/manifestacaonfindividual', login.required, manifestacaonfe.ManifestacaoNFIndividual);
router.get('/manifestacaodanfexmljson', login.required, manifestacaonfe.ManifestacaoDanfeXmlJson);

//FOCUS NFe - OPEN
router.get('/consultarprodutosmongo', login.required, nfeopen.Consultarprodutosmongo);
router.post('/cadastrarprodutosmongo', login.required, nfeopen.cadastrarprodutosmongo);
router.post('/atualizarjsonestoque', login.required, nfeopen.Atualizarjsonestoque);

//FOCUS CTe
router.get('/manifestacaonferecebidascte', login.required, manifestacaocte.ManifestacaoCTeRecebidas);
router.get('/manifestacaocteindividual', login.required, manifestacaocte.ManifestacaoCTIndividual);

//GET NET
router.get('/pagamentos', pagamentos.pagamentos);


module.exports = {
    routes: router
}
