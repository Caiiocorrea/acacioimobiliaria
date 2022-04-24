'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const produtostotal = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("produtos");
        const produtos = await pool.request()
            .query(sqlQueries.produtostotal);
        return produtos.recordset
    } catch (error) {
        return error.message;
    }
};


const produtos = async (PageNumber, RowspPage, IdUnidade) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("produtos");
        const produtos = await pool
            .request()
            .input("PageNumber", sql.Int, PageNumber)
            .input("RowspPage", sql.Int, RowspPage)
            .input("IdUnidade", IdUnidade)
            .query(sqlQueries.produtos);
        return produtos.recordset
    } catch (error) {
        return error.message;
    }
};

const atualizarjsonestoque = async (IdProduto) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("produtos");
        const produtos = await pool.request()
        .input("IdProduto", sql.Int, IdProduto)
            .query(sqlQueries.jsonestoque);
        return produtos.recordset
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    produtostotal,
    produtos,
    atualizarjsonestoque
}