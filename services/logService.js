// Centraliza la escritura del archivo de registro usando el módulo fs de Node.js.
const fs = require('fs');
const path = require('path');

const logsDirectory = path.join(__dirname, '..', 'logs');
const logFile = path.join(logsDirectory, 'log.txt');

function appendAccessLog(req) {
  const now = new Date();
  const date = now.toLocaleDateString('es-CL');
  const time = now.toLocaleTimeString('es-CL', { hour12: false });
  const line = `${date} | ${time} | ${req.method} ${req.originalUrl}\n`;

  fs.mkdir(logsDirectory, { recursive: true }, (mkdirError) => {
    if (mkdirError) {
      console.error('No fue posible preparar la carpeta de logs:', mkdirError.message);
      return;
    }

    fs.appendFile(logFile, line, 'utf8', (appendError) => {
      if (appendError) {
        console.error('No fue posible registrar el acceso:', appendError.message);
      }
    });
  });
}

module.exports = { appendAccessLog };
