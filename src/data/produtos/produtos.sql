-- SELECT *
-- 	, HauszMapa.Produtos.RetornaEstoquePrazosJsonX(Tab.IdProduto,@IdUnidade) JsonEstoque
-- 	, Tab.PrazoAdicional + Tab.EPTPrazo + CASE Tab.IdEstoque WHEN 2 THEN HauszMapa.Produtos.RetornaPrazoEstoqueVirtualPorQtd(Tab.IdProduto, 1) WHEN 4 THEN ISNULL(ISNULL(Tab.PFZPrazoTotal,Tab.PrazoFabricacao),999) ELSE 0 END Prazo
-- FROM (
SELECT DISTINCT
		--This come from ProdutoBasico
		PB.[SKU]
	  , PB.[IdProduto]
      , PB.[NomeProduto]
	  , PB.[NomeEtiqueta]
      , M.[Marca]
      , CAT.[NomeCat]
      , DEP.[NomeDept]
	  , REPLACE(PB.[EstoqueAtual],5,1) EstoqueAtual
	  , PB.[SaldoAtual]
	  , E.[IdEstoque]
--This come from ProdutoDetalhe
      , PD.[Descricao] Descricao
      , PD.[Unidade]
      , PD.[FatorMultiplicador]
	  , E.PrazoAdicional
	  ,E.PrioridadeEstoque
	  , EPT.Prazo EPTPrazo
	  , PFZ.PrazoTotal PFZPrazoTotal
	  , M.PrazoFabricacao
      , ISNULL(PB.[Peso],1) Peso
	  , PB.bitPromocao
		, ISNULL(SPU.bitAtivo,0) AS ProdutoShowroom
	FROM HauszMapa.Produtos.[ProdutoBasico] PB WITH (NOLOCK)
		LEFT JOIN HauszMapa.Produtos.[ProdutoDetalhe] PD ON [PB].[IdProduto] = [PD].[IdProduto]
		LEFT JOIN HauszMapa.Produtos.[Marca] M ON [PB].[IdMarca] = [M].[IdMarca]
		LEFT JOIN HauszMapa.Produtos.[SubCategoria] SB ON [PB].[IdSubCat] = [SB].[IdSubCat]
		LEFT JOIN HauszMapa.Produtos.[Categoria] CAT ON [SB].[IdCat] = [CAT].[IdCat]
		LEFT JOIN HauszMapa.Produtos.[Departamento] DEP ON [CAT].[IdDept] = [DEP].[IdDept]
		INNER JOIN HauszMapa.Estoque.[Estoque] E ON [PB].[EstoqueAtual] = [E].[IdEstoque]
		INNER JOIN HauszLogin.Cadastro.[Unidade] UN ON [UN].[IdUnidade] = @IdUnidade
		LEFT JOIN HauszMapa.Estoque.PrazosTransporte EPT ON UN.UF = EPT.UF AND UN.IdPraca = EPT.IdPraca --Prazo Transporte
		LEFT JOIN HauszMapa.Produtos.ProdutoPrazoProducFornec PFZ ON PB.SKU = PFZ.SKU
		LEFT JOIN HauszMapa.Showroom.ProdutosUnidade SPU ON PB.SKU = SPU.SKU AND SPU.IdUnidade = UN.IdUnidade
	WHERE [PB].[BitAtivo] = @IdUnidade AND UN.[IdUnidade] = @IdUnidade
		AND [PB].[IdMarca] NOT IN (SELECT IdMarca
		FROM HauszMapa.Produtos.[RestricoesMarca]
		WHERE IdUnidade = @IdUnidade)

	ORDER BY PB.bitPromocao DESC, E.PrioridadeEstoque, PB.SaldoAtual DESC
	--   ORDER BY PB.EstoqueAtual, [PB].[DataInserido] DESC

	  OFFSET ((@PageNumber - 1) * @RowspPage) ROWS
	  FETCH NEXT @RowspPage ROWS ONLY
	--   )Tab