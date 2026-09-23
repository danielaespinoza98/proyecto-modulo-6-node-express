const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

// Crea la carpeta uploads si no existe.
fs.mkdirSync(uploadDir, { recursive: true });

// Configuración del almacenamiento.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1E9)}${extension}`;

        cb(null, uniqueName);
    }
});

// Tipos de imagen permitidos.
const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
];

const upload = multer({
    storage,

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    'Tipo de archivo no permitido. Solo JPG, PNG o WEBP.'
                )
            );
        }

        cb(null, true);
    }
});

// Maneja los errores de Multer de forma controlada.
function uploadSingle(req, res, next) {
    upload.single('archivo')(req, res, (error) => {

        if (error) {

            if (
                error instanceof multer.MulterError &&
                error.code === 'LIMIT_FILE_SIZE'
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'El archivo supera el tamaño máximo de 2 MB',
                    data: null
                });
            }

            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: null
            });
        }

        next();
    });
}

module.exports = uploadSingle;