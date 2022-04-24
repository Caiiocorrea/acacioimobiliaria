UPDATE Logz.Logistica.Comentario
SET bitAtivo = @bitAtivo, DataAtualizaca = GETDATE
WHERE IdComentario = @IdComentario
