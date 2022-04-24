const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let produto = Schema({
    SKU: {
        type: String,
        required: false
    },
    IdProduto: {
        type: Number,
        required: false
    },
    NomeProduto: {
        type: String,
        required: false
    },
    NomeEtiqueta: {
        type: String,
        required: false
    },
    Marca: {
        type: String,
        required: false
    },
    NomeCat: {
        type: String,
        require: false
    },
    NomeDept: {
        type: String,
        require: false
    },
    EstoqueAtual: {
        type: String,
        require: false
    },
    SaldoAtual: {
        type: Number,
        require: false
    },
    IdEstoque: {
        type: Number,
        require: false
    },
    Descricao: {
        type: String,
        require: false
    },
    Unidade: {
        type: String,
        require: false
    },
    FatorMultiplicador: {
        type: Number,
        require: false
    },
    PrazoAdicional: {
        type: Number,
        require: false
    },
    EPTPrazo: {
        type: Number,
        require: false
    },
    PFZPrazoTotal: {
        type: Number,
        require: false
    },
    PrazoFabricacao: {
        type: Number,
        require: false
    },
    Peso: {
        type: Number,
        require: false
    },
    bitPromocao: {
        type: Boolean,
        require: false
    },
    ProdutoShowroom: {
        type: Boolean,
        require: false
    },
    JsonEstoque: {
        type: String,
        require: false
    },
    Prazo: {
        type: Number,
        require: false
    }
})


module.exports = mongoose.model("produtos", produto);