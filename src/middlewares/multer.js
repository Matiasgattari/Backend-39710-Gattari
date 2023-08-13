import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/documents')
    },
    filename: function (req, file, cb) {
        const date = Date.now()
        if(req.user){
            cb(null, `${date}-${req.user["email"]}-${file.originalname}`)
        }else{
            cb(null, `${date}-usuarioNoLogeado-${file.originalname}`)
            }
    }
})

// Agregar una función de filtro de archivos
const fileFilter = function(req, file, cb) {
  // Aceptar solo archivos .json
  if (file.mimetype === 'application/json') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Pasar la función de filtro de archivos como una opción
export const multerUpload = multer({ storage, fileFilter })
