'use strict';

const contasmodel = require('../../models/Contas.js')
const saldomodel = require('../../models/saldos.js')
const moment = require('moment');

const GetContas = async (req, res) => {
    try {
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (res.locals.permissoesDB.includes(...permitido) && res.locals.gruposDB.includes(...grupopermitido))
            contasmodel.find({ TipoFinanca: req.query.TipoFinanca, Active: req.query.Active || true })
                .populate({ path: 'Saldo', select: 'Saldo' })
                .skip(parseInt(req.query.PageNumber) - 1)
                .limit(parseInt(req.query.RowspPage))
                .exec(async (err, contas) => {
                    if (err) {
                        res.status(500).send({ error: err.message })
                    } else {
                        res.status(200).send({
                            total_de_registros: await contasmodel.find({ TipoFinanca: req.query.TipoFinanca, Active: req.query.Active || true }).count(),
                            pagina_atual: parseInt(req.query.PageNumber),
                            total_pagina_restante: parseInt(parseInt(req.query.PageNumber) / parseInt(await contasmodel.find({ TipoFinanca: req.query.TipoFinanca, Active: req.query.Active || true }).count())),
                            total_registro_por_pagina_solicitado: parseInt(req.query.RowspPage),
                            data: contas.length >= parseInt(await contasmodel.find({ TipoFinanca: req.query.TipoFinanca, Active: req.query.Active || true }).count()) ? contas : [],
                            resultados: {
                                NumeroPagamentos: await contasmodel.find({ TipoFinanca: req.query.TipoFinanca, BitPago: req.query.Active === "true" ? true : false }).count(),

                                Pagas: await contasmodel.aggregate([{ $match: { TipoFinanca: req.query.TipoFinanca, BitPago: req.query.Active === "true" ? true : false } }, { $group: { _id: null, Total: { $sum: "$Valor" } } }])
                                    .exec(err, Pagas => {
                                        if (err) return err.message
                                        else return req.query.TipoFinanca === 'pagar' ? `-${Pagas[0].Total}` : `+${Pagas[0].Total}`
                                    }),

                                Vencidos: await contasmodel.aggregate([{ $match: { TipoFinanca: req.query.TipoFinanca, Status: 'Vencido' } }, { $group: { _id: null, Total: { $sum: "$Valor" } } }])
                                    .exec(err, Vencidos => {
                                        if (err) return err.message
                                        else return req.query.TipoFinanca === 'pagar' ? `-${Vencidos[0].Total}` : `+${Vencidos[0].Total}`
                                    }),

                                TotalPagamentos: await contasmodel.aggregate([{ $match: { TipoFinanca: req.query.TipoFinanca } }, { $group: { _id: null, Total: { $sum: "$Valor" } } }])
                                    .exec(err, totalpagamentos => {
                                        if (err) return err.message
                                        else return req.query.TipoFinanca === 'pagar' ? `-${totalpagamentos[0].Total}` : `+${totalpagamentos[0].Total}`
                                    })
                            }
                        })
                    }
                })
        else res.status(403).send({ message: "Não Autorizado." });


    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const GetByConta = async (req, res) => {
    try {
        const data = req.query
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (res.locals.permissoesDB.includes(...permitido) && res.locals.gruposDB.includes(...grupopermitido))
            contasmodel
                .find(data)
                .populate({ path: 'Saldo', select: 'Saldo' })
                .skip(parseInt(req.query.PageNumber) - 1)
                .limit(parseInt(req.query.RowspPage))
                .exec((err, conta) => {
                    if (err)
                        res.status(500).send({ error: err.message })
                    else
                        if (conta.length > 0) res.status(200).send({ data: conta })
                        else res.status(400).send({ message: "Nenhum registro encontrado!" })
                })
        else
            res.status(403).send({ message: "Não Autorizado." });


    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const PostConta = async (req, res) => {
    try {
        const data = req.body;

        data.Saldo = await saldomodel.findOne({ Franquia: data.Subcategoria })
        data.DataVencimento = moment(data.DataVencimento).utc().format('YYYY-MM-DD')
        data.DataCriacao = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        data.InseridoPor = res.locals.Nome

        if (res.locals.permissoesDB.includes(res.locals.permissao) && res.locals.gruposDB.includes(res.locals.grupo))
            await contasmodel
                .create(data)
                .then((conta) => {
                    res.status(200).send({
                        message: "Conta cadastrada com sucesso!", data: conta
                    });
                }).catch((err) => {
                    res.status(400).send({ error: err.message });
                })

        else res.status(403).send({ message: "Não Autorizado." });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const PutConta = async (req, res) => {
    try {
        const data = req.body;

        data.Saldo = await saldomodel.findOne({ Franquia: data.Subcategoria })
        data.DataVencimento = moment(data.DataVencimento).utc().format('YYYY-MM-DD')
        data.DataCriacao = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        data.InseridoPor = res.locals.Nome


        if (res.locals.permissoesDB.includes(res.locals.permissao) && res.locals.gruposDB.includes(res.locals.grupo))
            await contasmodel
                .findOneAndUpdate({ _id: parseInt(req.params._id) }, data, { new: true })
                .then(conta => {
                    res.status(200).send({
                        message: "Conta atualizada com sucesso!", data: conta
                    });
                }).catch((err) => {
                    res.status(400).send({ error: err.message });
                })

        else res.status(403).send({ message: "Não Autorizado." });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const DelConta = async (req, res) => {
    try {
        const data = req.body.data;
        const active = req.query.active

        if (res.locals.permissoesDB.includes(res.locals.permissao) && res.locals.gruposDB.includes(res.locals.grupo))
            contasmodel.updateMany({ _id: data }, { $set: { Active: active } })
                .where({ manual: true })
                .exec((err, conta) => {
                    if (err) {
                        console.log({ error: err.message })
                    } else {
                        if (conta.matchedCount > 0)
                            res.status(200).send({
                                message: "Conta desativada com sucesso!", data: conta
                            });
                        else res.status(400).send({
                            message: "Conta não encontrada ou a mesma não foi inserida manualmente!"
                        });
                    }
                })

        else res.status(403).send({ message: "Não Autorizado." });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    GetContas,
    GetByConta,
    PostConta,
    PutConta,
    DelConta
}