const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

// Obtener publicaciones simuladas
router.get('/', publicacionController.getPublicacionesSimuladas);

module.exports = router;
