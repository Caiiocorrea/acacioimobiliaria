'use strict';

const dotenv = require('dotenv');
dotenv.config();

const {
    //SQL
    PORT,
    HOST,
    JWT_KEY,
    HOST_URL,
    SQL_USER,
    SQL_SERVER,
    SQL_ENCRYPT,
    SQL_DATABASE,
    SQL_PASSWORD,
    SQL_CONNECTIONLIMIT,

    //MONGO
    MONGODB_URI,

    // EMAIL
    EMAIL_HOST,
    EMAIL_SECURECONNECTION,
    EMAIL_PORT,
    EMAIL_TLSCIPHERS,
    EMAIL_USER,
    EMAIL_PASSWORD,
    SENDGRID_API_KEY,

    // MULTER
    MULTER_BASEPATH, 
    MULTER_HOST, 
    MULTER_SECURE, 
    MULTER_USER, 
    MULTER_PASSWORD
} = process.env;



module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    JWT_KEY: JWT_KEY,
    sql: {
        // connectionLimit: SQL_CONNECTIONLIMIT,
        server: SQL_SERVER,
        // database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: SQL_ENCRYPT,
            enableArithAbort: true
        }
    },
    email: {
        portEmail: EMAIL_PORT,
        hostEmail: EMAIL_HOST,
        secureConnection: EMAIL_SECURECONNECTION,
        ciphers: EMAIL_TLSCIPHERS,
        userEmail: EMAIL_USER,
        password: EMAIL_PASSWORD,
        sendgrid: SENDGRID_API_KEY
    },
    multer: {
        basepath: MULTER_BASEPATH,
    host: MULTER_HOST, 
    secure: MULTER_SECURE,
    user: MULTER_USER,
    password: MULTER_PASSWORD
    },
    MONGODB_URI: MONGODB_URI,
};