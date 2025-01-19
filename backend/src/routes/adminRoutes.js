
const express = require('express');
const router = express.Router();
const { register, login } = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Rutas de administración
router.post("/register", verifyToken, isAdmin, register); // Solo admins pueden registrar otros admins
router.post("/login", login);

// Solo SUPER_ADMIN puede crear otros ADMINs
router.post('/create-admin', verifyToken, isSuperAdmin, createAdmin);

// SUPER_ADMIN y ADMIN pueden crear STAFF
router.post('/create-staff', verifyToken, isAdminOrHigher, createAdmin);

// Ver lista de personal (accesible para todos los roles administrativos)
router.get('/staff-list', verifyToken, isStaffOrHigher, getStaffList);

module.exports = router;