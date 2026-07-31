const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verificarAuth = require('../middleware/authMiddleware');

// Operaciones de lectura
router.get('/', ticketController.obtenerTickets);
router.get('/:id', ticketController.obtenerTicketPorId);

// Operaciones de escritura
router.post('/', verificarAuth, ticketController.crearTicket);
router.put('/:id', verificarAuth, ticketController.actualizarTicket);
router.delete('/:id', verificarAuth, ticketController.eliminarTicket);

module.exports = router;
