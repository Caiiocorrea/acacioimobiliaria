SELECT
    IdComentario, 
    Comentario, 
    CodigoProcessamento, 
    InseridoPor, 
    AlteradoPor,
    DataInserido, 
    DataAlteracao,
    bitAtivo
FROM Logz.Logistica.Comentario WITH (NOLOCK)

ORDER BY IdComentario DESC 

OFFSET ((@PageNumber - 1) * @RowspPage)  ROWS 
FETCH NEXT @RowspPage ROWS ONLY