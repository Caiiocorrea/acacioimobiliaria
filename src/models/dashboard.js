const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dashboard = new Schema({
    IdUnidade: {
        type: Number,
        required: false
    },
    permissao: {
        type: String,
        required: false
    },
    Dashboard: {
        PorcentagemDia: {
            type: Number,
            required: false
        },
        comparacaoMesAnterior: {
            type: Number,
            required: false
        },
        FunilVendas: {
            type: Number,
            required: false
        },
        vendasMes: {
            type: Number,
            required: false
        },
        vendasDia: {
            type: Number,
            required: false
        },
        vendasDiaAnterior: {
            type: Number,
            required: false
        },
        ticketMedio: {
            type: Number,
            required: false
        },
        leadsGerados: {
            type: Number,
            required: false
        },
        leadsExpansao: {
            type: Number,
            required: false
        },
        mesEano: {
            type: String,
            required: false
        },
        totalPedidosShowroom: {
            type: Number,
            required: false
        },
        totalVendasFranquia: [
            {
                Nome: {
                    type: String,
                    required: false
                },
                Estado: {
                    type: String,
                    required: false
                },
                Regiao: {
                    type: String,
                    required: false
                },
                SomaVendaFranquia: {
                    type: Number,
                    required: false
                }
            }
        ],
        rankingVendedor: [
            {
                NomeVendedor: {
                    type: String,
                    required: false
                },
                Uf: {
                    type: String,
                    required: false
                },
                Nome: {
                    type: String,
                    required: false
                },
                VendaVendedor: {
                    type: Number,
                    required: false
                }
            }
        ],
        vendasPorMarcas: [
            {
                Marca: {
                    type: String,
                    required: false
                },
                TotalMes: {
                    type: Number,
                    required: false
                }
            }
        ],
        vendasPorDepartamento: [
            {
                NomeDept: {
                    type: String,
                    required: false
                },
                TotalMes: {
                    type: Number,
                    required: false
                }
            }
        ],
        custoTotalEstoque: {
            type: Number,
            required: false
        },
        lojasInauguradas: [
            {
                Total: {
                    type: Number,
                    required: false
                },
                Inauguradas: {
                    type: Number,
                    required: false
                },
                NaoInauguradas: {
                    type: Number,
                    required: false
                }
            }
        ]
    }
})

module.exports = mongoose.model("dashboards", dashboard);