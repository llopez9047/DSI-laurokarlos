-- Eliminamos las tablas en caso de que existan por alguna prueba anterior 
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS usuarios;

-- Creamos la tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla de Tickets del Help Desk
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL, 
    prioridad VARCHAR(20) NOT NULL, 
    estado VARCHAR(20) DEFAULT 'Abierto', -- Por defecto la opción Abierto
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
