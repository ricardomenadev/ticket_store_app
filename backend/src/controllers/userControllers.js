const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Crear nuevo usuario cliente
const createUser = async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;
    try {
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Obtener rol CUSTOMER
        const customerRole = await prisma.role.findFirst({
            where: { name: 'CUSTOMER' }
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
                status: 'ACTIVE'
            },
            // No devolver la contraseña
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                status: true
            }
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

// Login de usuario cliente
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar usuario con su rol
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true }
        });

        if (!user || user.role.name !== 'CUSTOMER') {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { userId: user.id, role: 'CUSTOMER' },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { createUser, loginUser };