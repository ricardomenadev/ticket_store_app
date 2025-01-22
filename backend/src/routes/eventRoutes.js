const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventControllers');
const { verifyToken, isAdminOrHigher } = require('../middlewares/auth');

// Agrupamos por acceso público/protegido
// Rutas públicas
router.get('/', getEvents);

// Rutas protegidas
router.post('/', verifyToken, isAdminOrHigher, createEvent);

module.exports = router;