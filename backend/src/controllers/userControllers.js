const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Crear nuevo usuario cliente
const createUser = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtener rol CUSTOMER
    const customerRole = await prisma.role.findFirst({
      where: { name: "CUSTOMER" },
    });

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        roleId: customerRole.id,
        status: "ACTIVE",
      },
      // No devolver la contraseña
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        status: true,
      },
    });
    res.status(201).json({
      success: true,
      data: newUser,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error en el servidor",
      data: null,
    });
  }
};

// Login de usuario cliente
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user || user.role.name !== "CUSTOMER") {
      return res.status(400).json({
        success: false,
        error: "Credenciales inválidas",
        data: null,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        error: "Credenciales inválidas",
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: "CUSTOMER" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      success: true,
      data: { token },
      message: "Login exitoso",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Error en el servidor",
      data: null,
    });
  }
};

module.exports = { createUser, loginUser };
