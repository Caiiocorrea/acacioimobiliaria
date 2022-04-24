const mongoose = require("mongoose");
const { AutoIncrement } = require('../mongoose')
const Schema = mongoose.Schema;

let conta = new Schema({
    Categoria: {
        type: String,
        required: true
    },
    Subcategoria: {
        type: String,
        required: true
    },
    CodigoPedido: {
        type: String,
        required: false
    },
    CentroCusto: {
        type: String,
        required: true
    },
    FormaPagamento: {
        type: String,
        required: true
    },
    Banco: {
        type: String,
        required: false
    },
    Agencia: {
        type: String,
        required: false
    },
    NumeroConta: {
        type: String,
        required: false
    },
    TipoConta: {
        type: String,
        required: false
    },
    BitPix: {
        type: Boolean,
        required: false,
        default: false
    },
    ChavePix: {
        type: String,
        required: false
    },
    DataVencimento: {
        type: Date,
        required: true
    },
    Valor: {
        type: Number,
        required: true
    },
    TotalPagar: {
        type: Number,
        required: false,
    },
    TotalReceber: {
        type: Number,
        required: false
    },
    Saldo: [{
        type: Schema.Types.ObjectId,
        ref: 'saldos'
    }],
    Observacao: {
        type: String,
        required: false
    },
    Anexos: [
        {
            Anexo: {
                type: String,
                required: false
            }
        }
    ],
    BitRepetir: {
        type: Boolean,
        required: false,
        default: false
    },
    BitAprovado: {
        type: Boolean,
        required: false, 
        default: false
    },
    Frequencia: {
        type: String,
        required: false
    },
    Ocorrencia: {
        type: Number,
        required: false
    },
    BitPago: {
        type: Boolean,
        required: false,
        default: false
    },
    Pagamento: [
        {
            DataPagamento: {
                type: Date,
                required: false
            },
            DescontosTaxas: {
                type: Number,
                required: false
            },
            JurosMultas: {
                type: Number,
                required: false
            },
            Conta: {
                type: String,
                required: false
            },
            Observacao: {
                type: String,
                required: false
            },
            ValorPago: {
                type: Number,
                required: false
            },
            ComprovantePagamento: [
                {
                    Comprovante: {
                        type: String,
                        required: false
                    }
                }
            ]
        }
    ],
    TipoFinanca: {
        type: String,
        required: true
    },
    Origem: {
        type: String,
        required: false
    },
    Status: {
        type: String,
        required: false,
        default: "Pendente"
    },
    SituacaoConta: {
        type:String,
        required: false,
        default: 'Pendente'
    },
    manual: {
        type: Boolean,
        required: true
    },
    Active: {
        type: Boolean,
        required: true,
        default: true
    },
    InseridoPor: {
        type: String,
        required: true
    },
    DataCriacao: {
        type: Date,
        required: true
    },
    AlteradoPor: {
        type: String,
        required: false
    },
    DataAlteracao: {
        type: Date,
        required: false,
        timezone: "-0300"
    },
}, { _id: false })

// __v é o campo do mongoose que é usado para verificar se o documento foi alterado
conta.pre('findOneAndUpdate', function(next) {
    this.findOneAndUpdate({}, { $inc: { __v: 1 } });
    return next()
});

// AutoIncrement é um plugin que faz com que o mongoose crie um campo autoincrement
conta.plugin(AutoIncrement);
module.exports = mongoose.model("contas", conta);