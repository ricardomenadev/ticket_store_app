const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const userRouters = require('./src/routes/userRoutes');
const adminRouters = require('./src/routes/adminRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/users', userRouters);
app.use('/api/auth', adminRouters);
app.use('/api/events', eventRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto: ${PORT}`);
});