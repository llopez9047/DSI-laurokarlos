# 🛠️ Help Desk - Backend API

Help Desk es una API RESTful desarrollada para la gestión de incidentes y tickets de soporte técnico, forma parte del trabajo práctico de la carrera de (TICs) de la UTM Online.

---

## 📌 Descripción

El sistema posee un módulo de autenticación de usuarios debidamente registrados y un sistema con operaciones CRUD para la creación, consulta, actualización y eliminación de tickets para dar soporte a incidentes de red, hardware y software.
El sistema permite gestionar las solicitudes de soporte técnico mediante una arquitectura cliente-servidor básica.
La base de datos está configurada para PostgreSQL, con cifrado tipo `bcrypt` para las claves

---

## 🚀 Tecnologías Utilizadas

- **Entorno de Ejecución:** Node.js
- **Framework Web:** Express.js (`v4.19.2`)
- **Base de Datos:** PostgreSQL
- **Driver BD:** `pg` (node-postgres `v8.11.5`)
- **Seguridad/Cifrado:** `bcrypt` (`v5.1.1`)
- **Soporte CORS:** `cors` (`v2.8.5`)
- **Despliegue Backend & BD:** Render (Cloud Hosting)
- **Pruebas de API:** Postman

---

## 📂 Estructura del Proyecto

```text
├── db/
│   └── init.sql              # Script SQL de creación de tablas
└── backend/
    ├── config/
    │   └── db.js             # Configuración y conexión con PostgreSQL (Pool & SSL)
    ├── controllers/
    │   ├── authController.js # Registro, login y consulta de usuarios
    │   └── ticketController.js # Operaciones CRUD completas de incidentes
    ├── routes/
    │   ├── authRoutes.js     # Rutas para /api/auth
    │   └── ticketRoutes.js   # Rutas para /api/tickets
    ├── package.json          # Gestión de dependencias
    └── server.js             # Servidor principal y middlewares
└── capturas/
    └── *.png                 # Archivos *.png de las capturas de pantalla de la configuración y ejecución del Help Desk  
```

---

## 🔐 Variables de Entorno y Configuración de Conexión

- **Port:** 3000
- **Node_Env:** production
- **Database_URL:**

---

## 🌐 Endpoints de la API REST

- **POST para registrar usuarios** /api/auth/registrar con body tipo JSON { "nombre": "...", "email": "...", "password": "..." }
- **POST para hacer login** /api/auth/login con body tipo JSON { "email": "...", "password": "..." }
- **GET para consultar usuarios** /api/auth/usuarios sin body tipo JSON 
- **POST para crear un incidente** /api/tickets con body tipo JSON { "titulo": "...", "descripcion": "...", "categoria": "...", "prioridad": "...", "usuario_id": 1 }
- **GET para listar los tickets** /api/tickets sin body tipo JSON
- **GET para listar un ticket por Id** /api/tickets/:id sin body tipo JSON
- **PUT para actualizar un ticket por Id** /api/tickets/:id con body tipo JSON { "estado": "Proceso", "prioridad": "Alta" }
- **DELETE para eliminar un ticket por Id** /api/tickets/:id sin body tipo JSON

---



