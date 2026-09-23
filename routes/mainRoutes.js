// Define las rutas públicas principales de la aplicación.
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/status', mainController.status);

module.exports = router;
