const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let centrocusto = new Schema({
    CentroCusto: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("centrocustos", centrocusto);