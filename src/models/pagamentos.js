const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pagamento = Schema({
    id: {
        type: String,
        required: false
    },
    payment_type: {
        type: String,
        required: false
    },
    customer_id: {
        type: String,
        required: false
    },
    order_id: {
        type: String,
        required: false
    },
    payment_id: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        require: false
    },
    status: {
        type: String,
        require: false
    },
    number_installments: {
        type: Number,
        require: false
    },
    acquirer_transaction_id: {
        type: String,
        require: false
    },
    authorization_timestamp: {
        type: String,
        require: false
    },
    brand: {
        type: String,
        require: false
    },
    terminal_nsu: {
        type: String,
        require: false
    },
    authorization_code: {
        type: String,
        require: false
    },
    bank: {
        type: Number,
        require: false
    },
    our_number: {
        type: Number,
        require: false
    },
    typeful_line: {
        type: String,
        require: false
    },
    issue_date: {
        type: String,
        require: false
    },
    DataInserido: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("pagamentos", pagamento);