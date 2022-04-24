const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let formapagamento = new Schema({
    FormaPagamento: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("formapagamentos", formapagamento);