const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registramos usuarios nuevos de soporte técnico
exports.registrar = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const nuevoUsuario = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
            [nombre, email, passwordHash]
        );
        res.status(201).json({ mensaje: 'Usuario registrado con éxito en la nube', usuario: nuevoUsuario.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'El correo electrónico ya está registrado o los campos son inválidos.' });
    }
};

// Autenticación y generación de JWT
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (usuario.rows.length === 0) {
            return res.status(404).json({ error: 'El usuario no existe en la base de datos.' });
        }

        const validPassword = await bcrypt.compare(password, usuario.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Firmamos un token con un tiempo de expiración de 8 horas
        const token = jwt.sign({ id: usuario.rows[0].id }, process.env.JWT_SECRET || 'SECRET_KEY_2026', { expiresIn: '8h' });
        
        res.json({
            mensaje: 'Autenticación exitosa',
            token,
            usuario: { id: usuario.rows[0].id, nombre: usuario.rows[0].nombre }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno en el servidor durante el login.' });
    }
};
