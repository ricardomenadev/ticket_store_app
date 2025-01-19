const express = require('express');
const router = express.Router();
const { getOrders, createOrder } = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Rutas de pedidos
router.get('/', verifyToken, isAdmin, getOrders); // Solo admins ven todos los pedidos
router.post('/', verifyToken, createOrder); // Usuario autenticado puede crear pedido

module.exports = router;
