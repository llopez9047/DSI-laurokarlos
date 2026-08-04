const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Servidor Help Desk UTM corriendo correctamente.');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en el puerto ${PORT}`);
});
