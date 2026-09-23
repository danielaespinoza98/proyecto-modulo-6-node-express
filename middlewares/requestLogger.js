// Registra visitas a las rutas solicitadas por la evaluación.
const { appendAccessLog } = require('../services/logService');

module.exports = (req, res, next) => {
  if (req.path === '/' || req.path === '/status') {
    appendAccessLog(req);
  }

  next();
};
