// Contiene la lógica de respuesta de las rutas principales.
const path = require('path');

exports.home = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};

exports.status = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime())
  });
};
