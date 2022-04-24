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
                data: request.responseText
            })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const ManifestacaoCTeRecebidas = async (req, res) => {
    try {
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (res.locals.permissoesDB.includes(...permitido) && res.locals.gruposDB.includes(...grupopermitido)) {
            request.open('GET', "https://homologacao.focusnfe.com.br/v2/ctes_recebidas?cnpj=" + focus.focus.CNPJ_HAUSZ, false, focus.focus.TOKEN);
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

const ManifestacaoCTIndividual = async (req, res) => {
    try {
        const chave = req.query.chave

        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (res.locals.permissoesDB.includes(...permitido) && res.locals.gruposDB.includes(...grupopermitido)) {
            let PDF = async () => {
                request.open('GET', "https://homologacao.focusnfe.com.br/v2/ctes_recebidas/" + chave + ".pdf", false, focus.focus.TOKEN)
                request.send()
                return request.responseText
            }

            let XML = async () => {
                request.open('GET', "https://homologacao.focusnfe.com.br/v2/ctes_recebidas/" + chave + ".xml", false, focus.focus.TOKEN)
                request.send()
                return request.responseText
            }

            let JSON = async () => {
                request.open('GET', "https://homologacao.focusnfe.com.br/v2/ctes_recebidas/" + chave + ".json?completa=1", false, focus.focus.TOKEN)
                request.send()
                return request.responseText
            }

            return res.send({
                json: await JSON().then(json => {
                    return [json]
                }),
                pdf: await PDF().then(pdf => {
                    return [pdf.replace('<html><body>You are being <a href=', '').replace('>redirected</a>.</body></html>', '').slice(1, -1)]
                }),
                xml: await XML().then(xml => {
                    return [xml]
                })
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
                request.open('GET', focus.focus.MANIFESTACAO_DANFEXMLJSON + chave + `.${tipo}`, false, focus.focus.TOKEN);
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
    ManifestacaoCTeRecebidas,
    ManifestacaoCTIndividual,
    ManifestacaoDanfeXmlJson
}