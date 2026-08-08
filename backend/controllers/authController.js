const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        const usuario = result.rows[0];
        const match = await bcrypt.compare(password, usuario.password);
        
        if (!match) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno en el servidor." });
    }
};

exports.registrar = async (req, res) => {
    const { nombre, email, password, rol = 'Cliente' } = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
            [nombre, email, hashedPassword, rol]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al registrar el usuario." });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, email FROM usuarios ORDER BY id ASC');
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener la lista de usuarios." });
    }
};
