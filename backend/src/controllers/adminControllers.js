const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
                status: 'ACTIVE'
            },
            // Excluir la contraseña de la respuesta
            select: {
                id: true,
                firstName: true,
                email: true,
                roleId: true,
                status: true
            }
        });
        res.json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear administrador' });
    }
};

// Login para admin/staff
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar usuario incluyendo su rol
        const user = await prisma.user.findUnique({
            where: { email },
            include: { role: true }
        });

        if (!user || !['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(user.role.name)) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar JWT con rol incluido
        const token = jwt.sign(
            { userId: user.id, role: user.role.name }, 
            process.env.JWT_SECRET, 
            { expiresIn: '12h' }
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { register, login };
