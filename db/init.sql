-- Para la consistencia de datos en el Help Desk creamos los Enums necesarios 
CREATE TYPE categoria_ticket AS ENUM ('Red', 'Hardware', 'Software');
CREATE TYPE prioridad_ticket AS ENUM ('Alta', 'Media', 'Baja');
CREATE TYPE estado_ticket AS ENUM ('Abierto', 'En Progreso', 'Cerrado');

-- Creamos la tabla de Usuarios (Soporte técnico / Clientes)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla de Tickets de Incidentes
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria categoria_ticket NOT NULL,
    prioridad prioridad_ticket NOT NULL,
    estado estado_ticket DEFAULT 'Abierto',
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertamos un usuario inicial y tickets semilla para pruebas en la nube
INSERT INTO usuarios (nombre, email, password) VALUES 
('Lauro Karlos', 'llopez9047@utm.edu.ec', '$2b$10$EixZA5EAqAzVo5zFcdd/JeS2h76m9A.a9y.H.x8vLupL2gZ759Y2O'); -- Contraseña encriptada

INSERT INTO tickets (titulo, descripcion, categoria, prioridad, estado, usuario_id) VALUES
('No se conecta a la red Wi-Fi interna', 'Falla general al autenticar en el AccesPoint del segundo piso.', 'Red', 'Alta', 'Abierto', 1),
('Impresora no enciende', 'Modelo HP LaserJet de la dirección financiera no tiene energía.', 'Hardware', 'Media', 'En Proceso', 1);
