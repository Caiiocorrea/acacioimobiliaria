const jwt = require('jsonwebtoken');
const config = require('../config');

let token = []
let decode = []
let Nome = []
let IdColaborador = []
let IdUnidade = []
let permissao = []

exports.required = (req, res, next) => {
    try {
        token = req.headers.authorization.split(' ')[1];
        decode = jwt.decode(token, config.JWT_KEY);

        Nome = decode.Nome
        IdColaborador = decode.IdColaborador
        IdUnidade = decode.IdUnidade
        permissao = decode.Privilegio
        grupo = decode.Grupo
        gruposDB = decode.GruposDB
        permissoesDB = decode.PermissoesDB

        res.locals.Nome = Nome
        res.locals.IdColaborador = IdColaborador
        res.locals.IdUnidade = IdUnidade
        res.locals.permissao = permissao
        res.locals.grupo = grupo
        res.locals.gruposDB = gruposDB
        res.locals.permissoesDB = permissoesDB

        next();

    } catch (error) {
        res.status(401).send({ message: 'Sua sessão expirou, faça login novamente.', error })
    }
}

exports.optional = (req, res, next) => {
    try {
        token = req.headers.authorization.split(' ')[1];
        decode = jwt.verify(token, config.JWT_KEY);

        Nome = decode.Nome
        IdColaborador = decode.IdColaborador
        IdUnidade = decode.IdUnidade
        permissao = decode.Privilegio
        grupo = decode.Grupo
        gruposDB = decode.GruposDB
        permissoesDB = decode.PermissoesDB

        res.locals.Nome = Nome
        res.locals.IdColaborador = IdColaborador
        res.locals.IdUnidade = IdUnidade
        res.locals.permissao = permissao
        res.locals.grupo = grupo
        res.locals.gruposDB = gruposDB
        res.locals.permissoesDB = permissoesDB
        next();

    } catch (error) {
        res.status(401).send({ message: 'Sua sessão expirou, faça login novamente.' })
    }

}