'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const postlogs = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('log');
        const perfil = await pool.request()
            .input('Usuario', data.user)
            .input('Evento', data.event)
            .input('Dados', data.dados)
            .input('Rota', data.path)
            .query(sqlQueries.postlogs);

        return perfil.recordset;
    } catch (error) {
        return error.message;
    }
}



module.exports = {
    postlogs
}