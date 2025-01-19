const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los pedidos
const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderProducts: true,
                orderTickets: true
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pedidos' });
    }
};

// Crear nuevo pedido
const createOrder = async (req, res) => {
    const { userId, total, products, tickets } = req.body;
    try {
        // Crear pedido con productos y entradas
        const newOrder = await prisma.order.create({
            data: {
                userId,
                total,
                status: 'PENDING',
                // Crear relaciones con productos
                orderProducts: {
                    create: products.map(product => ({
                        productId: product.id,
                        quantity: product.quantity,
                        unitPrice: product.price
                    }))
                },
                // Crear relaciones con entradas
                orderTickets: {
                    create: tickets.map(ticket => ({
                        ticketId: ticket.id,
                        price: ticket.price
                    }))
                }
            },
            include: {
                orderProducts: true,
                orderTickets: true
            }
        });
        res.json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear pedido' });
    }
};

module.exports = { getOrders, createOrder };