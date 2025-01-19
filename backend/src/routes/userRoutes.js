const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');

// Rutas de usuarios
router.post('/register', createUser); // Registro público
router.post('/login', loginUser);

module.exports = router;