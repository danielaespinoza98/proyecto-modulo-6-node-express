// Responde cuando el usuario solicita una ruta que no existe.
module.exports = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada',
    data: null
  });
};
