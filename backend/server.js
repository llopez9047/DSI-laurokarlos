const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);


app.use((req, res) => {
    res.status(404).json({ error: 'El endpoint solicitado no existe en la infraestructura del Help Desk.' });
});

app.listen(PORT, () => {
    console.log(`Help Desk: Servidor de producción ejecutándose en la nube.`);
});
