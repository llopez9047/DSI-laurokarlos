const pool = require('../config/db');

// POST /tickets - Creamos los incidentes
exports.crearTicket = async (req, res) => {
    const { titulo, descripcion, categoria, prioridad, usuario_id } = req.body;
    try {
        const query = `
            INSERT INTO tickets (titulo, descripcion, categoria, prioridad, usuario_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const result = await pool.query(query, [titulo, descripcion, categoria, prioridad, usuario_id || null]);
        
        // Simulamos un log de notificación de estados
        console.log(`[Mesa de Ayuda] Ticket N.º ${result.rows[0].id} creado. Estado: Abierto.`);
        
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear el ticket." });
    }
};

// GET /tickets - Listamos todos los tickets
exports.listarTickets = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickets ORDER BY creado_en DESC');
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al listar los tickets." });
    }
};

// GET /tickets/:id - Buscamos tickets por Id
exports.obtenerTicketPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ticket no encontrado." });
        }
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al buscar el ticket." });
    }
};

// PUT /tickets/:id - Actualizamos el estado o detalles del ticket
exports.actualizarTicket = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;
    try {
        const query = `
            UPDATE tickets 
            SET titulo = COALESCE($1, titulo), 
                descripcion = COALESCE($2, descripcion), 
                categoria = COALESCE($3, categoria), 
                prioridad = COALESCE($4, prioridad), 
                estado = COALESCE($5, estado)
            WHERE id = $6 RETURNING *
        `;
        const result = await pool.query(query, [titulo, descripcion, categoria, prioridad, estado, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ticket no encontrado." });
        }
        
        console.log(`[Mesa de Ayuda] Ticket N.º ${id} actualizado. Nuevo Estado: ${result.rows[0].estado}.`);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al actualizar el ticket." });
    }
};

// DELETE /tickets/:id - Eliminamos un ticket por Id
exports.eliminarTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tickets WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ticket no encontrado." });
        }
        return res.status(200).json({ message: "Ticket eliminado correctamente de la mesa de ayuda." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar el ticket." });
    }
};
