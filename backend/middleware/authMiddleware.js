const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado. Token no suministrado o inválido.' });
    }

    try {
        
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY_2026');
        req.usuarioId = verificado.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};
