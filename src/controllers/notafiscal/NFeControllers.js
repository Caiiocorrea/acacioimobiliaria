'use strict';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const focus = require('../../config');
let request = new XMLHttpRequest();
const parser = require('xml2json');
const moment = require('moment');

const Emitir = async (req, res) => {
    try {
        const codigopedido = req.query.codigopedido

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('POST', focus.focus.EMITIR_NFE + codigopedido, false, focus.focus.TOKEN);

            const nfe = {
                //EMITENTE
                "natureza_operacao": "Venda Merc.Adq/Rec.Terceiros, Destinada a nao Contribuinte",
                "data_emissao": moment().format('YYYY-MM-DD HH:mm:ss'),
                "data_entrada_saida": moment().format('YYYY-MM-DD HH:mm:ss'),
                "tipo_documento": "1",
                "finalidade_emissao": "1",
                "cnpj_emitente": "41323182000119",
                "nome_emitente": "HAUSZ AMBIENTES E REVESTIMENTOS LTDA",
                "nome_fantasia_emitente": "HAUSZ AMBIENTES E REVESTIMENTOS LTDA",
                "logradouro_emitente": "AV DAS AGUIAS",
                "numero_emitente": "510",
                "bairro_emitente": "CIDADE UNIVERSITARIA PEDRA BRANCA",
                "municipio_emitente": "Santa Catarina",
                "uf_emitente": "SC",
                "cep_emitente": "88137-280",
                "inscricao_estadual_emitente": "260983381",

                //DESTINATARIO
                "nome_destinatario": "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL",
                "cpf_destinatario": "51966818092",
                "telefone_destinatario": "1196185555",
                "logradouro_destinatario": "Rua S\u00e3o Janu\u00e1rio",
                "numero_destinatario": "99",
                "bairro_destinatario": "Crespo",
                "municipio_destinatario": "Manaus",
                "uf_destinatario": "AM",
                "pais_destinatario": "Brasil",
                "cep_destinatario": "69073178",
                "valor_frete": "0.0",
                "valor_seguro": "0",
                "valor_total": "100.00",
                "valor_produtos": "100.00",
                "modalidade_frete": "0",

                //PRODUTOS
                "items": [
                    {
                        "numero_item": "1",
                        "codigo_produto": "1232",
                        "descricao": "Cartu00f5es de Visita",
                        "cfop": "6923",
                        "unidade_comercial": "un",
                        "quantidade_comercial": "100",
                        "valor_unitario_comercial": "0.4723",
                        "valor_unitario_tributavel": "0.4723",
                        "unidade_tributavel": "un",
                        "codigo_ncm": "49111090",
                        "quantidade_tributavel": "100",
                        "valor_bruto": "47.23",
                        "icms_situacao_tributaria": "400",
                        "icms_origem": "0",
                        "pis_situacao_tributaria": "07",
                        "cofins_situacao_tributaria": "07"
                    },
                    {
                        "numero_item": "2",
                        "codigo_produto": "548",
                        "descricao": "Banana",
                        "cfop": "6923",
                        "unidade_comercial": "un",
                        "quantidade_comercial": "100",
                        "valor_unitario_comercial": "2.00",
                        "valor_unitario_tributavel": "2.00",
                        "unidade_tributavel": "un",
                        "codigo_ncm": "49111090",
                        "quantidade_tributavel": "100",
                        "valor_bruto": "200",
                        "icms_situacao_tributaria": "400",
                        "icms_origem": "0",
                        "pis_situacao_tributaria": "07",
                        "cofins_situacao_tributaria": "07"
                    }
                ]
            };

            request.send(JSON.stringify(nfe));
            res.status(request.status).send({ data: JSON.parse(request.responseText) })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const Consultar = async (req, res) => {
    try {
        const codigopedido = req.query.codigopedido

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('GET', focus.focus.CONSULTAR_NFE + codigopedido + "?completa=1", false, focus.focus.TOKEN);
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

const Cancelar = async (req, res) => {
    try {
        const codigopedido = req.query.codigopedido

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('DELETE', focus.focus.CANCELAR + codigopedido, false, focus.focus.TOKEN);

            const cancelar = { "justificativa": "Sua justificativa aqui!" };
            request.send(JSON.stringify(cancelar));

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

const Inutilizar = async (req, res) => {
    try {
        const inutiliza = req.body 

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('POST', focus.focus.INUTILIZACAO, false, focus.focus.TOKEN);
            request.send(JSON.stringify(inutiliza));

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

const CartaCorrecao = async (req, res) => {
    try {
        const codigopedido = req.query.codigopedido
        const correcao = req.body.correcao

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        console.log({ codigopedido, correcao })

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('POST', focus.focus.CARTACORRECAO + codigopedido + "/carta_correcao", false, focus.focus.TOKEN);
            request.send(correcao);

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

const ReenviarEmail = async (req, res) => {
    try {
        const email = req.body.email
        const codigopedido = req.query.codigopedido

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        console.log({ codigopedido, email, emails: JSON.stringify({ "emails": email }) })

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            request.open('POST', focus.focus.REENVIAREMAIL + codigopedido + "/email", false, focus.focus.TOKEN);
            request.send(JSON.stringify({ "emails": email }))

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

module.exports = {
    Emitir,
    Consultar,
    Cancelar,
    Inutilizar,
    CartaCorrecao,
    ReenviarEmail
}