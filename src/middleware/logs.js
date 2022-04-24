const jwt = require('jsonwebtoken');
// const config = require('../config');
// const logsdata = require('../data/log')

exports.Logger = async (req, res, next) => {
    try {
        token = req.headers.authorization.split(' ')[1];
        decode = jwt.decode(token, config.JWT_KEY);

        let data;
        let user = req.user.Nome;
        let method = req.method;
        let body = JSON.stringify(req.body);
        let query = JSON.stringify(req.query);
        let params = JSON.stringify(req.params);
        let path = req.path;

        next()

        // const metodo = ['PUT', 'DELETE', 'POST', 'GET'];
        // if ((metodo.includes(method))) {
        //     data = {
        //         user,
        //         event: method === 'POST' ? 'Cadastrar' : method === 'PUT' ? 'Editar' : 'Deletar',
        //         dados: params !== '{}' ? params : query !== '{}' ? query : body,
        //         path
        //     }

        //     // const result = await logsdata.postlogs(data)
        //     console.log(result)
        //     next();
        // }
        // else {
        //     next();
        // }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}