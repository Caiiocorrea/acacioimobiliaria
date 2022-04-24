const xlsx = require("xlsx");

exports.uploadAnexo = (req, res, next) => {
  try {
    const file = req.file;
    const { buffer } = file;
    const workbook = xlsx.read(buffer);
    const sheet_name_list = workbook.SheetNames;
    const tabela = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
      { raw: true }
    );

    const nomeArquivo = file.originalname

    res.locals.tabela = tabela
    res.locals.nomeArquivo = nomeArquivo

    next()
    res.status(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
