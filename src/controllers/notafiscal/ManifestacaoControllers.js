'use strict';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const focus = require('../../config');
const parser = require('xml2json');
let request = new XMLHttpRequest();

const Manifesto = async (req, res) => {
    try {
        const manifesto = req.body.manifesto
        const chave = req.query.chave

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('POST', focus.focus.MANIFESTO + chave + "/manifesto", false, focus.focus.TOKEN);
            request.send(JSON.stringify(manifesto));

            res.status(request.status).send({
                data: JSON.parse(request.responseText)
            })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const ManifestacaoNFRecebidas = async (req, res) => {
    try {
        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('GET', 'https://api.focusnfe.com.br/v2/nfes_recebidas?cnpj' + focus.focus.CNPJ_HAUSZ, false, 'kO4VKCJYgf8Vl4lfqUQCNwy9eetGqQSG');
            request.send();

            res.status(request.status).send({
                data: JSON.parse(request.responseText)
            })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const ManifestacaoNFIndividual = async (req, res) => {
    try {
        const chave = req.query.chave
        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('GET', 'https://api.focusnfe.com.br/v2/nfes_recebidas/' + chave + "?completa=1", false, 'kO4VKCJYgf8Vl4lfqUQCNwy9eetGqQSG');
            request.send();

            res.status(request.status).send({
                data: JSON.parse(request.responseText)
            })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const ManifestacaoDanfeXmlJson = async (req, res) => {
    try {
        const tipo = req.query.tipo
        const chave = req.query.chave

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {

            if (!tipo || !chave) {
                !tipo
                    ? res.status(400).send({ message: 'Necessário informar o tipo' })
                    : res.status(400).send({ message: 'Necessário informar a chave' })
            }

            else if (tipo === 'xml') {
                request.open('GET', focus.focus.MANIFESTACAO_DANFEXMLJSON + chave + `.${tipo}`, false, focus.focus.TOKEN);
                request.send()
                const json = parser.toJson(request.responseText)
                res.status(request.status).send({ data: JSON.parse(json) })
            }

            else if (tipo === 'pdf') {
                request.open('GET', 'https://api.focusnfe.com.br/v2/nfes_recebidas/'+ chave + `.${tipo}?completa=1`, false, 'kO4VKCJYgf8Vl4lfqUQCNwy9eetGqQSG');
                request.send();
                res.status(request.status).send({ data: request.responseText })
            }

            else if (tipo === 'json') {
                request.open('GET', focus.focus.MANIFESTACAO_DANFEXMLJSON + chave + `.${tipo}`, false, focus.focus.TOKEN);
                request.send();
                res.status(request.status).send({ data: JSON.parse(request.responseText) })
            }

            else {
                res.status(404).send({ message: 'Não encontrado.' })
            }
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    Manifesto,
    ManifestacaoNFRecebidas,
    ManifestacaoNFIndividual,
    ManifestacaoDanfeXmlJson
}