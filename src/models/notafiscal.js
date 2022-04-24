const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let notafiscal = Schema({
    name: {
        type: String,
        required: true
    },
    unidade: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    auth: {
        type: String,
        required: true
    },
    json: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model("notasfiscais", notafiscal);