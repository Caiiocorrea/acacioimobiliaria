const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let produto = Schema({
    SKU: {
        type: String,
        required: true
    },
    CodOmie: {
        type: Number,
        required: true
    },
    NomeProduto: {
        type: String,
        required: true
    },
    EAN: {
        type: Boolean,
        required: true
    },
    NCM: {
        type: String,
        required: true
    },
    Marca: {
        type: String,
        require: true
    },
    NomeSubCat: {
        type: String,
        require: true
    },
    Unidade: {
        type: String,
        require: true
    },
    FatorMultiplicador: {
        type: Number,
        require: true
    },
    Peso: {
        type: Number,
        require: true
    },
    PesoCubado: {
        type: Number,
        require: true
    },
    MarkupVenda: {
        type: Number,
        require: true
    },
    Preco: {
        type: Number,
        require: true
    }
})


module.exports = mongoose.model("produtos", produto);