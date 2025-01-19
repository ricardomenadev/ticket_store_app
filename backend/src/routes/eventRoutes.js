const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Rutas de eventos
router.get('/', getEvents); // Público
router.post('/', verifyToken, isAdmin, createEvent); // Solo admins

module.exports = router;
