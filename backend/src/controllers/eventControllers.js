const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los eventos
const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                tickets: true // Incluir información de entradas
            }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
};

// Crear nuevo evento
const createEvent = async (req, res) => {
    const { name, date, location, price, capacity, description } = req.body;
    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                date,
                location,
                price,
                capacity,
                description,
                status: 'SCHEDULED'
            }
        });
        res.json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear evento' });
    }
};

module.exports = { getEvents, createEvent };
