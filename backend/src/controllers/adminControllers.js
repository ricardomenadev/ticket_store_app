const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Registra un nuevo admin o staff
const register = async (req, res) => {
  const { firstName, email, password, roleId } = req.body;
  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo admin/staff
    const newAdmin = await prisma.user.create({
      data: {
        firstName,
        email,
        password: hashedPassword,
        roleId,
        status: "ACTIVE",
      },
      // Excluir la contraseña de la respuesta
      select: {
        id: true,
        firstName: true,
        email: true,
        roleId: true,
        status: true,
      },
    });
    res.json(newAdmin);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error en el servidor",
      data: null,
    });
  }
};

// Verificar token y obtener información del usuario
const verifyTokenGet = async (req, res) => {
  try {
    // Obtener el token del header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No se proporcionó token",
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    // Devolver información del usuario
    res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Token inválido",
    });
  }
};

// Login para admin/staff
const login = async (req, res) => {
  const { email, password } = req.body;
  // Validar input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email y contraseña son requeridos",
      details: "Debe proporcionar tanto email como contraseña",
    });
  }
  try {
    // Buscar usuario incluyendo su rol
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    // Detailed error handling
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Usuario no encontrado",
        details: "No existe un usuario con este correo electrónico",
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        error: "Contraseña incorrecta",
        details: "La contraseña proporcionada no es correcta",
      });
    }

    // Verificar rol
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"];
    if (!allowedRoles.includes(user.role.name)) {
      return res.status(403).json({
        success: false,
        error: "Acceso no autorizado",
        details: "Su rol no tiene permisos para iniciar sesión",
      });
    }

    // Generar JWT con rol incluido
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          role: user.role.name,
        },
      },
      message: "Login exitoso",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};
module.exports = { register, login, verifyTokenGet };
