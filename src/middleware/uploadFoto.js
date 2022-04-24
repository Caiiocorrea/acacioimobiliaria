const multer = require("multer");
const path = require("path");
const moment = require('moment');
const date = Date.now();
const format = "YYYY-MM-DD HH:mm:ss";


//  FUNÇOES DE STORAGE DOS MULTER

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploadimg');
  },
  filename: (req, file, cb) => {
    const marca = req.query.Marca;
    let nome = marca + "-" + Date.now() + "-" + file.originalname;
    cb(null, nome);
  }
});

const stgComprovanteEntrega = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploadimg');
  },
  filename: (req, file, cb) => {
    let dataFile = moment(date).format('YYYY-MM-DD');
    const pedido = req.query.pedido;
    let nome =  pedido  + "-" +file.fieldname+ "-" + dataFile + "-" + file.originalname;
    cb(null, nome);
  }
});

const stgPostMkt = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploadimg');
  },
  filename: (req, file, cb) => {
    let nome = file.originalname;
    cb(null, nome);
  }
});


const stgFotoColab = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploadimg');
  },
  filename: (req, file, cb) => {
    const IdColaborador = req.query.IdColaborador;
    let nome = `Colaborador_${IdColaborador}.png`	;
    cb(null, nome);
  }
});

const stgPDFMarca = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploadimg');
  },
  filename: (req, file, cb) => {
    let dataFile = moment(date).format('YYYY-MM-DD');
    const marca = req.query.marca;
    let nome = marca + "-" + dataFile + "-" + file.originalname;
    cb(null, nome);
  }
});

const stgUnidades = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploadimg');
  },
  filename: (req, file, cb) => {
    let dataFile = moment(date).format('YYYY-MM-DD');
    let IdUnidade = req.query.IdUnidade
   let nome =  IdUnidade  + "-" +file.fieldname+ "-" + dataFile + "." + file.originalname.split('.').pop(3);
    cb(null, nome);
  }
});


//============================================================================================
//FUNÇOES DE UPLOAD DO MULTER
const uploadImg = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/png",

    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Somente imagens com extensão PNG são permitidas"));
    }
  }
});

const uploadEntrega = multer({
  storage: stgComprovanteEntrega,
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/jpg",
      "image/png",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Somente imagens com extensão PNG, JPEG, PJPEG, JPG são permitidas"));
    }
  }
})

const uploadPostMkt = multer({
  storage: stgPostMkt,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/jpg",
      "image/png"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Somente imagens com extensão PNG, JPEG, PJPEG, JPG são permitidas"));
    }
  }
})



const ImgColaborador = multer({
  storage: stgFotoColab,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/jpg",
      "image/png",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Somente imagens com extensão PNG, JPEG, PJPEG, JPG são permitidas"));
    }
  }
});

const PDFMarca = multer({
  storage: stgPDFMarca,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Somente arquivos pdf são permitidas"));
    }
  }
});

const uploadUnid = multer({
  storage: stgUnidades,
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 5
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Permitido arquivos pdf, jpeg, pjpeg, jpg, png são permitidas"));
    }
  }
});


module.exports = { uploadImg, uploadEntrega, uploadPostMkt, ImgColaborador, PDFMarca, uploadUnid };



