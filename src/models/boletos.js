const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let boleto = new Schema({
    Nr_Contrato: {
        type: String,
        required: true
    },
    Nr_Documento: {
        type: String,
        required: true
    },
    Valor: {
        type: String,
        required: true
    },
    Vencimento: {
        type: String,
        required: true
    },
    Linha_Digitavel: {
        type: String,
        required: true
    },
    Download: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("boletos", boleto);