const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyTokenGet,
} = require("../controllers/adminControllers");
const {
  verifyToken,
  isSuperAdmin,
  isAdminOrHigher,
  isStaffOrHigher,
} = require("../middlewares/auth");

// Agrupamos las rutas por funcionalidad
// Rutas públicas
router.post("/login", login);
// Ruta para verificar token
router.get("/verify", verifyToken);

// Rutas protegidas
router.post("/register", verifyToken, isAdminOrHigher, register);
// router.post('/create-admin', verifyToken, isSuperAdmin, createAdmin);
// router.post('/create-staff', verifyToken, isAdminOrHigher, createAdmin);
// router.get('/staff-list', verifyToken, isStaffOrHigher, getStaffList);

module.exports = router;
