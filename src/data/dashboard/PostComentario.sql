INSERT INTO Logz.Logistica.Comentario
    (
    Comentario,
    CodigoProcessamento,
    InseridoPor,
    DataInserido,
    bitAtivo
    )

VALUES(
        @Comentario,
        @CodigoProcessamento,
        @InseridoPor,
        GETDATE(),
        1
    );

SELECT *
FROM Logz.Logistica.Comentario WITH (NOLOCK)
WHERE IdComentario = SCOPE_IDENTITY()
