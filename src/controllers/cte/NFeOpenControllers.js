'use strict';
// const produtossqlmodel = require('../../models/produtostosql.js')
// const produtosmodel = require('../../models/produtos')
const produtosdata = require('../../data/produtos')

const cadastrarprodutosmongo = async (req, res) => {
    try {
        const dados = req.body
        const referencia = req.query.referencia
        const PageNumber = req.query.PageNumber || 1
        const RowspPage = req.query.RowspPage || 100
        const IdUnidade = 1
        let data = [];

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            // const produtosdobd = await produtosdata.produtos(PageNumber, RowspPage, IdUnidade)
            // const produtosdobd = await produtosdata.produtostotal()
            // console.log(produtosdobd.length)
            // await produtosdata.produtos(PageNumber, RowpPage, IdUnidade).then(async (produtos) => {


            for (let tosave of produtosjson) {
                produtossqlmodel.find(tosave).then(async (produto) => {
                    data.push(tosave)
                    // produto.map(async (produtos) => {
                    //     console.log({ produto: produtos.SKU })
                    // })
                    if (!produto) {
                        // console.log('produto [NÃO] existe')
                        // await produtossqlmodel.create(tosave)
                    }
                    else {
                        // console.log(produto)
                        console.log('produto [JÁ] existe')
                    }
                })
            }
            console.log(data.length)


            // produtosjson.map(async (tosave) => {
            // produtossqlmodel.find()
            // .then(async (produto) => {
            //     await produto.map(async (produtos) => {
            //         console.log({ produto: produtos.SKU })
            //     })
            // if (!produto) {
            //     // console.log('produto [NÃO] existe')
            //     // await produtossqlmodel.create(tosave)
            // }
            // else {
            //     // console.log(produto)
            //     console.log('produto [JÁ] existe')
            // }
            // })
            // })
            return res.status(200).send({ message: "Produtos cadastrados com sucesso." })

            // })
            // .catch((err) => {
            //     console.log(err)
            // })

            // produtosmodel.find().skip(PageNumber).limit(RowpPage).exec((err, produtos) => {
            //     if (err) {
            //         return res.status(500).send({ error: err.message });
            //     }
            //     else {
            //         return res.status(200).send({
            //             data: produtos.map(produto => {
            //                 return produto
            //             })
            //         })
            //     }
            // });


            // request.open('GET', focus.focus.CONSULTAR_NFE + referencia + "?completa=1", false, focus.focus.TOKEN);
            // request.send();
            // data = JSON.parse(request.responseText)

            // if (referencia === data.ref) {
            //     res.status(400).send({
            //         data: {
            //             message: "Não é possivel emitir uma nota fiscal com o mesmo numero de referencia.",
            //         }
            //     })
            // }

            // else {
            //     request.open('POST', focus.focus.EMITIR_NFE + referencia, false, focus.focus.TOKEN);

            //     const nfe = {
            //         //EMITENTE
            //         "natureza_operacao": "Venda Merc.Adq/Rec.Terceiros, Destinada a nao Contribuinte",
            //         "data_emissao": moment().format('YYYY-MM-DD HH:mm:ss'),
            //         "data_entrada_saida": moment().format('YYYY-MM-DD HH:mm:ss'),
            //         "tipo_documento": "1",
            //         "finalidade_emissao": "1",
            //         "cnpj_emitente": "41323182000119",
            //         "nome_emitente": "HAUSZ AMBIENTES E REVESTIMENTOS LTDA",
            //         "nome_fantasia_emitente": "HAUSZ AMBIENTES E REVESTIMENTOS LTDA",
            //         "logradouro_emitente": "AV DAS AGUIAS",
            //         "numero_emitente": "510",
            //         "bairro_emitente": "CIDADE UNIVERSITARIA PEDRA BRANCA",
            //         "municipio_emitente": "Santa Catarina",
            //         "uf_emitente": "SC",
            //         "cep_emitente": "88137-280",
            //         "inscricao_estadual_emitente": "260983381",

            //         //DESTINATARIO
            //         ...dados.destinatario,

            //         //PRODUTOS
            //         "items": [ ...dados.items ]
            //     };

            //     request.send(JSON.stringify(nfe));
            //     res.status(request.status).send({ data: JSON.parse(request.responseText) })

            // }
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const Consultarprodutosmongo = async (req, res) => {
    try {
        const codigopedido = req.query.codigopedido
        const PageNumber = req.query.PageNumber || 1
        const RowpPage = req.query.RowpPage || 20

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            produtossqlmodel.find().skip(PageNumber).limit(RowpPage).exec((err, produtos) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
                else {
                    return res.status(200).send({
                        data: produtos.map(produto => {
                            return produto
                        })
                    })
                }
            });

            // request.open('GET', focus.focus.CONSULTAR_NFE + codigopedido + "?completa=1", false, focus.focus.TOKEN);
            // request.send();

            // res.status(request.status).send({
            //     data: JSON.parse(request.responseText)
            // })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const Atualizarjsonestoque = async (req, res) => {
    try {
        // const codigopedido = req.query.codigopedido
        // const PageNumber = req.query.PageNumber || 1
        // const RowpPage = req.query.RowpPage || 20
        let cadastrado = [], atualizado = [], dadosNaN = [], newbody = [];

        //RECEBE AS PERMISSOES E GRUPOS CADASTRADOS NO BANCO
        let permissoes = res.locals.permissoesDB
        let grupos = res.locals.gruposDB

        //Permitidos
        const permitido = ['Administrador'];
        const grupopermitido = ['TI']

        if (permissoes.includes(...permitido) && grupos.includes(...grupopermitido)) {
            produtosdata.produtos(i + 1, 2000, 1).then((dados) => {
                newbody.push(dados)
                console.log(i + 1, newbody)

                if (dados === null || dados === 'NaN' || dados === 'operation timed out for an unknown reason' || dados[0].IdProduto === undefined) {
                    console.log({ message: 'dados', dados: dados })
                }

                else if (dados.length === 0) {
                }
                else {
                    console.log({ message: 'sem dados dados', })
                }

            }).catch(async (err) => {
                newbody.map(async (dadosjson) => {
                    console.log({ dados: dadosjson })

                })
            })


            // const produtosdobd = await produtosdata.produtostotal()
            // const quantidade = parseInt(produtosdobd.length)/2000+1
            // console.log(parseInt(quantidade))

            // for (let i = 0; i < quantidade.length; i++) {
            // produtosdata.produtos(i + 1, 2000, 1).then((dados) => {
            // newbody.push(dados)
            // console.log(i+1, newbody)

            // if (dados === null || dados === 'NaN' || dados === 'operation timed out for an unknown reason' || dados[0].IdProduto === undefined) {
            //     console.log({ message: 'dados', dados: dados })
            // }

            // else if(dados.length === 0){
            // }
            // else {
            //     console.log({ message: 'sem dados dados', })
            // }

            // }).catch(async (err) => {
            //     newbody.map(async (dadosjson) => {
            //         console.log({ dados: dadosjson })

            //     })





            // for (let j = 0; j < newbody.length; j++) {
            //     await produtosdata.atualizarjsonestoque(i + 1, produtosdobd.length, 1).then(async (dadosjson) => {
            //         console.log({ dadosjson: dadosjson })
            //     })

            //     // cadastrado.push(...newbody[j])
            //     // console.log({ Contador: j+1, Produtos: cadastrado })
            //     // console.log({ message: 'dados', dados: newbody[j] })
            //     // produtossqlmodel
            //     //     .findOne({ 'IdProduto': parseInt(newbody.IdProduto) })
            //     //     .exec(async (err, produto) => {
            //     //         console.log({ produto: produto })
            //     //         if (produto.length === 0) {
            //     //             // await produtossqlmodel.create(...dados)
            //     //             cadastrado.push(...dados)
            //     //             // console.log({ message: 'Cadastrado com sucesso', IdProduto: parseInt(dados[0].IdProduto) })
            //     //         }
            //     //         else if (produto.length >= 1) {
            //     //             atualizado.push(...dados)
            //     //             // await produtossqlmodel.findOneAndUpdate({ IdProduto: parseInt(dados[0].IdProduto) }, { JsonEstoque: dados[0].JsonEstoque })
            //     //             // console.log({ message: 'Atualizado com sucesso', IdProduto: parseInt(dados[0].IdProduto) })
            //     //         }
            //     //         else if(produto.length === undefined || produto.length === null){
            //     //             console.log({ message: 'Produto null' })
            //     //         }
            //     //     })

            // }
            // return res.send(cadastrado)
            // })
            // }

            // console.log(cadastrado)
            // res.send({ cadastrado })
        }
        else {
            res.status(403).send({ message: "Não Autorizado." });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    cadastrarprodutosmongo,
    Consultarprodutosmongo,
    Atualizarjsonestoque
}