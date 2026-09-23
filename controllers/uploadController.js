function uploadFile(req, res) {

    if (!req.file) {
        return res.status(400).json({
            status: 'error',
            message: 'No se recibió ningún archivo',
            data: null
        });
    }

    const fileUrl =
        `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    return res.status(201).json({
        status: 'ok',
        message: 'Archivo subido correctamente',
        data: {
            nombreOriginal: req.file.originalname,
            nombreGuardado: req.file.filename,
            tipo: req.file.mimetype,
            tamaño: req.file.size,
            url: fileUrl
        }
    });
}

module.exports = {
    uploadFile
};