const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let saldo = new Schema({
    Franquia: {
        type: String,
        required: true
    },
    IdUnidade: {
        type: Number,
        required: false
    },
    Saldo: {
        type: Number,
        required: false
    }
})


module.exports = mongoose.model("saldos", saldo);