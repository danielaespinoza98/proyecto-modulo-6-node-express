// Entrega una respuesta consistente ante errores no controlados.
module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    data: null
  });
};
