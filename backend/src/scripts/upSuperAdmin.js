// scripts/upSuperAdmin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function upSuperAdmin() {
    try {
        // 1. Crear el rol SUPER_ADMIN si no existe
        const superAdminRole = await prisma.role.upsert({
            where: { name: 'SUPER_ADMIN' },
            update: {},
            create: { name: 'SUPER_ADMIN' }
        });

        // 2. Crear los otros roles base
        await prisma.role.createMany({
            data: [
                { name: 'ADMIN' },
                { name: 'STAFF' },
                { name: 'CUSTOMER' }
            ],
            skipDuplicates: true
        });

        // 3. Crear el usuario SUPER_ADMIN
        const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);
        
        const superAdmin = await prisma.user.create({
            data: {
                firstName: 'Super',
                lastName: 'Admin',
                email: process.env.SUPER_ADMIN_EMAIL,
                password: hashedPassword,
                phone: '123456789',
                roleId: superAdminRole.id,
                status: 'ACTIVE'
            }
        });

        console.log('SUPER_ADMIN creado exitosamente:', superAdmin.email);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

upSuperAdmin();