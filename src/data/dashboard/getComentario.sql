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
WHERE ( 
    CodigoProcessamento = @CodigoProcessamento
    OR IdComentario = @IdComentario
    )