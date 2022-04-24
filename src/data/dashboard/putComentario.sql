UPDATE Logz.Logistica.Comentario
SET Comentario = @Comentario, 
    AlteradoPor = @AlteradoPor, 
    DataAlteracao = GETDATE()
WHERE CodigoProcessamento = @CodigoProcessamento
      AND IdComentario = @IdComentario


SELECT *
FROM Logz.Logistica.Comentario WITH (NOLOCK)
WHERE IdComentario = @IdComentario