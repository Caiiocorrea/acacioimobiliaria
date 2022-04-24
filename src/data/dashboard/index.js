'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const GetAllComentarios = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentario');
        const GetAllComentario = await pool.request()
            .input('PageNumber', sql.Int, data.PageNumber)
            .input('RowspPage', sql.Int, data.RowspPage)
            .query(sqlQueries.getAllComentarios)
        return GetAllComentario.recordset;
    } catch (error) {
        return error.message;
    }
}

const GetComentario = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentario');
        const GetComentario = await pool.request()
            .input('IdComentario', sql.Int, data.IdComentario)
            .input('CodigoProcessamento', sql.Int, data.CodigoProcessamento)
            .query(sqlQueries.getComentario)
        return GetComentario.recordset;
    } catch (error) {
        return error.message;
    }
}

const PostComentario = async (data, InseridoPor) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentario');
        const PostComentario = await pool.request()
            .input('CodigoProcessamento', data.CodigoProcessamento)
            .input('Comentario', data.Comentario)
            .input('InseridoPor', InseridoPor)
            .query(sqlQueries.PostComentario)
        return PostComentario.recordset;
    } catch (error) {
        return error.message;
    }
}

const PutComentario = async (data, AlteradoPor) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentario');
        const PutComentario = await pool.request()
            .input('IdComentario', sql.Int, data.IdComentario)
            .input('CodigoProcessamento', sql.Int, data.CodigoProcessamento)
            .input('Comentario', data.Comentario)
            .input('AlteradoPor', AlteradoPor)
            .query(sqlQueries.putComentario)
        return PutComentario.recordset;
    } catch (error) {
        return error.message;
    }
}

const DelComentario = async (data, status) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentario');
        const DelComentario = await pool.request()
            .input('bitAtivo', status)
            .input('CodigoProcessamento', data.CodigoProcessamento)
            .query(sqlQueries.DelComentario)
        return DelComentario.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    GetAllComentarios,
    GetComentario,
    PostComentario,
    PutComentario,
    DelComentario
}