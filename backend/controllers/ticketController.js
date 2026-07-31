const db = require('../config/db');

// GET tickets para enlistar todos los incidentes
exports.obtenerTickets = async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM tickets ORDER BY creado_en DESC');
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los incidentes en la base de datos de la nube.' });
    }
};

// GET tickets por id para buscar un ticket específico 
exports.obtenerTicketPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('SELECT * FROM tickets WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'El ticket solicitado no fue encontrado.' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al procesar la búsqueda del ticket.' });
    }
};

// POST tickets  para registrar un nuevo incidente
exports.crearTicket = async (req, res) => {
    const { titulo, descripcion, categoria, prioridad } = req.body;
    const usuario_id = req.usuarioId; 
    try {
        const nuevoTicket = await db.query(
            'INSERT INTO tickets (titulo, descripcion, categoria, prioridad, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, descripcion, categoria, prioridad, usuario_id]
        );
        res.status(201).json({ mensaje: 'Ticket registrado con éxito.', ticket: nuevoTicket.rows[0] });
    } catch (error) {
        res.status(400).json({ error: 'Error al insertar. Valide que las categorías y prioridades correspondan con los tipos permitidos.' });
    }
};

// PUT tickets por id para actualizar un estado 
exports.actualizarTicket = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;
    try {
        const resultado = await db.query(
            'UPDATE tickets SET titulo = $1, descripcion = $2, categoria = $3, prioridad = $4, estado = $5 WHERE id = $6 RETURNING *',
            [titulo, descripcion, categoria, prioridad, estado, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'El incidente que intenta modificar no existe.' });
        }
        res.json({ mensaje: 'Ticket modificado con éxito.', ticket: resultado.rows[0] });
    } catch (error) {
        res.status(400).json({ error: 'Error en la actualización. Asegure datos coherentes con la estructura.' });
    }
};

// DELETE tickets por id para eliminar un registro de forma permanente
exports.eliminarTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('DELETE FROM tickets WHERE id = $1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'El incidente que intenta eliminar no existe.' });
        }
        res.json({ mensaje: 'Ticket removido de la base de datos de manera satisfactoria.' });
    } catch (error) {
        res.status(500).json({ error: 'Error de servidor al intentar eliminar el recurso.' });
    }
};
