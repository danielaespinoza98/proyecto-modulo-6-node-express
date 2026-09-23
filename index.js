// Carga las variables de entorno definidas en el archivo .env.
require('dotenv').config();

// Importa Express para crear el servidor web.
const express = require('express');
const path = require('path');
const { testConnection } = require('./services/database');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const requestLogger = require('./middlewares/requestLogger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const orderRoutes = require('./routes/orderRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

// Permite recibir datos JSON y formularios simples si se agregan rutas en el futuro.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registra accesos a las rutas principales en logs/log.txt.
app.use(requestLogger);

// Sirve archivos estáticos desde la carpeta public.
app.use(express.static(path.join(__dirname, 'public')));

// Conecta las rutas principales de la aplicación.
app.use('/', mainRoutes);
app.use('/usuarios', userRoutes);
app.use('/pedidos', orderRoutes);

// Maneja rutas que no existen.
app.use(notFound);

// Maneja errores generales del servidor.
app.use(errorHandler);

async function startServer() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

startServer();
