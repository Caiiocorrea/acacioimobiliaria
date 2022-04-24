'use strict';
// const extratodata = require("../../data/comentario");

const GetAllExtrato = async (req, res) => {
    try {
        const data = {
            PageNumber: req.query.PageNumber || 1,
            RowspPage: req.query.RowspPage || 20,
            Inativo: req.query.Inativo || 1
        }

        //Recebe do middleware as informações do usuário conectado
        let permissao = res.locals.permissao;
        let grupo = res.locals.grupo;

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        if (permissoes.includes(permissao) && grupos.includes(grupo)) {
            
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const GetExtrato = async (req, res) => {
    try {
        const data = { 
            IdComentario: req.query.IdComentario || null, 
            CodigoProcessamento: req.query.CodigoProcessamento || null,
        }

        //Recebe do middleware as informações do usuário conectado
        let permissao = res.locals.permissao;
        let grupo = res.locals.grupo;

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        if (permissoes.includes(permissao) && grupos.includes(grupo)) {
            
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const PostExtrato = async (req, res) => {
    try {
        const data = req.body;

        //Recebe do middleware as informações do usuário conectado
        let permissao = res.locals.permissao;
        let grupo = res.locals.grupo;

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //DADOS USUÁRIO CONECTADO
        let InseridoPor = res.locals.Nome;

        if (permissoes.includes(permissao) && grupos.includes(grupo)) {

        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const PutExtrato= async (req, res) => {
    try {
        const data = req.body
        
        //Recebe do middleware as informações do usuário conectado
        let permissao = res.locals.permissao;
        let grupo = res.locals.grupo;

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //DADOS USUÁRIO CONECTADO
        let AlteradoPor = res.locals.Nome;

        if (permissoes.includes(permissao) && grupos.includes(grupo)) {

        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const DelExtrato = async (req, res) => {
    try {
        const data = req.query
        let status;

        //Recebe do middleware as informações do usuário conectado
        let permissao = res.locals.permissao;
        let grupo = res.locals.grupo;

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        if (permissoes.includes(permissao) && grupos.includes(grupo)) {

        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    GetAllExtrato,
    GetExtrato,
    PostExtrato,
    PutExtrato,
    DelExtrato
}