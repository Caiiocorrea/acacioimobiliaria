'use strict';
// const pagamentosmodel = require('../../models/pagamentos.js')

const pagamentos = async (req, res) => {
    try {
        const dados = req.query
        console.log(dados)

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            await pagamentosmodel.create(dados).then(pagamentos => {
                console.log('pagamentos', pagamentos)
                res.status(200).send({ data: pagamentos })
            }).catch(err => {
                console.log('err', err)
                res.status(500).send({ error: err.message })
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
    pagamentos
}