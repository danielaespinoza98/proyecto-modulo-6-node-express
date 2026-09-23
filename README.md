# Node & Express Web App

## Descripción

Proyecto backend desarrollado progresivamente con **Node.js** y **Express.js** durante los módulos 6, 7 y 8.

El desarrollo se realizó de manera incremental:

- **Módulo 6:** estructura inicial del servidor, rutas, contenido HTML/JSON, archivos estáticos, middlewares y persistencia básica mediante logs.
- **Módulo 7:** conexión a MySQL, Sequelize ORM, operaciones CRUD, relaciones entre modelos, SQL manual y transacciones.
- **Módulo 8:** consolidación de la aplicación como API RESTful, autenticación mediante JSON Web Tokens (JWT), rutas protegidas y subida de archivos mediante Multer.

El proyecto utiliza una arquitectura modular basada en rutas, controladores, modelos, middlewares y servicios.

---

## Repositorio

GitHub:

```text
https://github.com/danielaespinoza98/proyecto-modulo-6-node-express
```

---

# Tecnologías utilizadas

## Tecnologías principales

- Node.js
- Express.js
- JavaScript
- npm
- MySQL
- Sequelize ORM
- mysql2
- dotenv
- nodemon
- JSON Web Token
- Multer
- Postman
- Git
- GitHub
- módulo nativo `fs`

## Entorno utilizado durante las pruebas

- Node.js: `v22.23.2`
- npm: `10.9.8`
- Express: `^4.21.2`
- Sequelize: `6.37.8`
- mysql2: `3.24.4`
- jsonwebtoken: `9.0.3`
- multer: `2.0.2`

---

# Estructura final del proyecto

```text
.
├── controllers/
│   ├── mainController.js
│   ├── userController.js
│   ├── orderController.js
│   ├── authController.js
│   └── uploadController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
│   ├── errorHandler.js
│   ├── notFound.js
│   └── requestLogger.js
│
├── models/
│   ├── User.js
│   ├── Order.js
│   ├── History.js
│   └── index.js
│
├── routes/
│   ├── mainRoutes.js
│   ├── userRoutes.js
│   ├── orderRoutes.js
│   ├── authRoutes.js
│   └── uploadRoutes.js
│
├── services/
│   ├── database.js
│   └── logService.js
│
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── uploads/
│   └── index.html
│
├── logs/
│   └── log.txt
│
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Arquitectura

La aplicación separa responsabilidades mediante diferentes carpetas:

- `controllers/`: contiene la lógica que procesa las solicitudes.
- `routes/`: define los endpoints disponibles.
- `middlewares/`: ejecuta validaciones y lógica intermedia antes de los controladores.
- `models/`: representa las entidades de la base de datos mediante Sequelize.
- `services/`: contiene funciones reutilizables, como conexión a base de datos y escritura de logs.
- `public/`: contiene archivos estáticos y archivos subidos.
- `logs/`: contiene registros de solicitudes.

---

# Requisitos

Para ejecutar el proyecto se necesita:

- Node.js 18 o superior
- npm
- MySQL
- una base de datos creada
- Postman o cliente HTTP equivalente para probar la API

Comprobar versiones:

```bash
node -v
npm -v
```

---

# Instalación

Desde la carpeta raíz:

```bash
npm install
```

---

# Variables de entorno

La aplicación utiliza un archivo `.env` para almacenar configuración sensible.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=modulo7_node
DB_USER=root
DB_PASSWORD=tu_contrasena_mysql

JWT_SECRET=tu_clave_jwt
JWT_EXPIRES_IN=1h
```

El archivo `.env` está incluido en `.gitignore`, por lo que sus valores reales no se almacenan en GitHub.

El archivo `.env.example` contiene únicamente valores de referencia.

---

# Ejecución

## Modo normal

```bash
npm start
```

## Modo desarrollo

```bash
npm run dev
```

Cuando todo funciona correctamente:

```text
Conexión a MySQL establecida correctamente.
Servidor iniciado en http://localhost:3000
```

---

# MÓDULO 6 — Backend inicial con Node.js y Express

## Objetivo

La primera etapa consistió en construir una aplicación backend básica capaz de:

- iniciar un servidor Express;
- entregar contenido HTML;
- responder en formato JSON;
- servir archivos estáticos;
- utilizar rutas;
- utilizar controladores;
- utilizar middlewares;
- registrar accesos en un archivo plano;
- manejar rutas inexistentes.

---

## GET /

Ruta:

```text
GET http://localhost:3000/
```

Entrega la página HTML principal desde:

```text
public/index.html
```

---

## GET /status

Ruta:

```text
GET http://localhost:3000/status
```

Ejemplo de respuesta:

```json
{
  "status": "ok",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2026-09-23T01:26:23.045Z",
  "uptimeSeconds": 731
}
```

---

## Archivos estáticos

Express publica la carpeta:

```text
public/
```

mediante:

```javascript
express.static()
```

Ejemplo:

```text
http://localhost:3000/css/styles.css
```

---

## Logs

El middleware `requestLogger` registra accesos en:

```text
logs/log.txt
```

Ejemplo:

```text
22-09-2026 | 22:19:45 | GET /
22-09-2026 | 22:26:23 | GET /status
```

Cada línea registra:

- fecha;
- hora;
- método HTTP;
- ruta solicitada.

---

## Manejo de ruta inexistente

Una ruta no definida devuelve una respuesta controlada:

```json
{
  "status": "error",
  "message": "Ruta no encontrada",
  "data": null
}
```

---

# MÓDULO 7 — Persistencia y ORM

## Objetivo

La segunda etapa incorporó persistencia real mediante MySQL y Sequelize ORM.

Se implementaron:

- conexión Node.js → MySQL;
- modelos;
- CRUD;
- relaciones;
- SQL manual;
- ORM;
- validaciones;
- transacciones;
- COMMIT;
- ROLLBACK.

---

# Base de datos

Base utilizada:

```text
modulo7_node
```

Tablas principales:

```text
usuarios
pedidos
historiales_usuario
```

---

# Modelo User

Representa:

```text
usuarios
```

Campos principales:

```text
id
nombre
email
password
created_at
updated_at
```

---

# Modelo Order

Representa:

```text
pedidos
```

Campos:

```text
id
usuario_id
producto
total
created_at
```

---

# Modelo History

Representa:

```text
historiales_usuario
```

Campos:

```text
id
usuario_id
descripcion
created_at
```

---

# Relación Usuario — Pedido

Se implementó:

```text
Usuario 1 ───── N Pedidos
```

Configuración:

```javascript
User.hasMany(Order, {
    foreignKey: 'usuario_id',
    as: 'pedidos'
});

Order.belongsTo(User, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});
```

---

# CRUD de usuarios

## Consultar usuarios

```text
GET /usuarios
```

Utiliza Sequelize ORM.

---

## Consulta SQL manual

```text
GET /usuarios/sql
```

Consulta:

```sql
SELECT
    id,
    nombre,
    email,
    created_at,
    updated_at
FROM usuarios
ORDER BY id ASC;
```

---

## Crear usuario

```text
POST /usuarios
```

Ejemplo:

```json
{
  "nombre": "Ana Pérez",
  "email": "ana@gmail.com",
  "password": "123456"
}
```

---

## Actualizar usuario

```text
PUT /usuarios/:id
```

En el Módulo 8 esta ruta fue protegida mediante JWT.

---

## Eliminar usuario

```text
DELETE /usuarios/:id
```

En el Módulo 8 esta ruta fue protegida mediante JWT.

---

# CRUD de pedidos

## GET

```text
GET /pedidos
```

## POST

```text
POST /pedidos
```

Ejemplo:

```json
{
  "usuario_id": 1,
  "producto": "Notebook",
  "total": 650000
}
```

## PUT

```text
PUT /pedidos/:id
```

## DELETE

```text
DELETE /pedidos/:id
```

---

# Consulta relacionada

Ruta:

```text
GET /usuarios/:id/pedidos
```

Utiliza `include` de Sequelize para obtener un usuario junto con sus pedidos.

Ejemplo:

```text
GET /usuarios/1/pedidos
```

---

# Transacciones

Ruta:

```text
POST /usuarios/con-historial
```

La operación realiza:

```text
1. Crear usuario
2. Crear historial
```

Si ambas operaciones funcionan:

```text
COMMIT
```

Si alguna falla:

```text
ROLLBACK
```

---

# Prueba de ROLLBACK

Ejemplo:

```json
{
  "nombre": "Elena Silva",
  "email": "elena.rollback@gmail.com",
  "password": "123456",
  "forzarError": true
}
```

La segunda operación falla intencionalmente.

La transacción se revierte y el usuario tampoco queda almacenado.

---

# MÓDULO 8 — API RESTful, JWT y subida de archivos

## Objetivo

La tercera etapa consolidó el proyecto como una API RESTful capaz de ser consumida desde un cliente externo.

Se incorporaron:

- autenticación;
- JWT;
- rutas públicas y privadas;
- middleware de autorización;
- validación de tokens;
- expiración de tokens;
- subida de archivos;
- validación de tipo;
- validación de tamaño.

---

# Diseño RESTful

La API utiliza métodos HTTP según la operación:

| Método | Ruta | Función |
|---|---|---|
| GET | `/usuarios` | Consultar usuarios |
| POST | `/usuarios` | Crear usuario |
| PUT | `/usuarios/:id` | Actualizar usuario |
| DELETE | `/usuarios/:id` | Eliminar usuario |
| GET | `/pedidos` | Consultar pedidos |
| POST | `/pedidos` | Crear pedido |
| PUT | `/pedidos/:id` | Actualizar pedido |
| DELETE | `/pedidos/:id` | Eliminar pedido |
| POST | `/login` | Autenticación |
| POST | `/upload` | Subida de archivos |

Las respuestas de la API mantienen un formato consistente:

```json
{
  "status": "ok",
  "message": "Descripción de la operación",
  "data": {}
}
```

o:

```json
{
  "status": "error",
  "message": "Descripción del error",
  "data": null
}
```

---

# Autenticación JWT

## Login

Ruta:

```text
POST /login
```

Ejemplo:

```json
{
  "email": "ana@gmail.com",
  "password": "123456"
}
```

Una autenticación correcta devuelve:

```json
{
  "status": "ok",
  "message": "Login realizado correctamente",
  "data": {
    "usuario": {
      "id": 1,
      "nombre": "Ana Pérez",
      "email": "ana@gmail.com"
    },
    "token": "JWT_GENERADO"
  }
}
```

El token tiene una duración configurada mediante:

```env
JWT_EXPIRES_IN=1h
```

---

# Cómo utilizar el JWT

Para consumir una ruta protegida se debe enviar:

```text
Authorization: Bearer TOKEN
```

En Postman:

```text
Authorization
→ Bearer Token
→ pegar token generado por POST /login
```

---

# Rutas protegidas

Se protegieron al menos estas dos operaciones:

```text
PUT /usuarios/:id
DELETE /usuarios/:id
```

Estas rutas utilizan:

```text
middlewares/authMiddleware.js
```

---

# Solicitud sin token

Ejemplo:

```text
PUT /usuarios/2
```

sin autorización.

Respuesta:

```json
{
  "status": "error",
  "message": "Token no proporcionado",
  "data": null
}
```

Código:

```text
401 Unauthorized
```

---

# Solicitud con JWT válido

La misma ruta con:

```text
Authorization: Bearer TOKEN_VALIDO
```

permite realizar la operación.

Respuesta:

```text
200 OK
```

---

# Token inválido o expirado

Cuando se envía un token incorrecto o vencido:

```json
{
  "status": "error",
  "message": "Token inválido o expirado",
  "data": null
}
```

Código:

```text
401 Unauthorized
```

---

# Login incorrecto

Cuando las credenciales no son válidas:

```json
{
  "status": "error",
  "message": "Credenciales inválidas",
  "data": null
}
```

Código:

```text
401 Unauthorized
```

---

# Subida de archivos

Se implementó:

```text
POST /upload
```

El endpoint utiliza **Multer**.

La ruta se encuentra protegida mediante JWT.

Los archivos son almacenados en:

```text
public/uploads/
```

---

# Cómo subir un archivo

En Postman:

```text
POST http://localhost:3000/upload
```

Authorization:

```text
Bearer Token
```

Body:

```text
form-data
```

Campo:

```text
Key: archivo
Type: File
```

---

# Tipos de archivos permitidos

El middleware acepta:

```text
JPG
JPEG
PNG
WEBP
```

Tipos MIME:

```text
image/jpeg
image/png
image/webp
```

---

# Tamaño máximo

El límite configurado es:

```text
2 MB
```

---

# Subida exitosa

Ejemplo de respuesta:

```json
{
  "status": "ok",
  "message": "Archivo subido correctamente",
  "data": {
    "nombreOriginal": "mouse inalambrico.jpg",
    "nombreGuardado": "archivo-generado.jpg",
    "tipo": "image/jpeg",
    "tamaño": 82621,
    "url": "http://localhost:3000/uploads/archivo-generado.jpg"
  }
}
```

Código:

```text
201 Created
```

---

# Tipo de archivo inválido

Por ejemplo, si se intenta subir:

```text
prueba.docx
```

la aplicación responde:

```json
{
  "status": "error",
  "message": "Tipo de archivo no permitido. Solo JPG, PNG o WEBP.",
  "data": null
}
```

Código:

```text
400 Bad Request
```

---

# Archivo demasiado grande

Si la imagen supera 2 MB:

```json
{
  "status": "error",
  "message": "El archivo supera el tamaño máximo de 2 MB",
  "data": null
}
```

Código:

```text
400 Bad Request
```

---

# Rutas públicas y privadas

## Públicas

```text
GET  /
GET  /status
GET  /usuarios
GET  /usuarios/sql
POST /usuarios
POST /login
GET  /pedidos
GET  /usuarios/:id/pedidos
```

## Protegidas mediante JWT

```text
PUT    /usuarios/:id
DELETE /usuarios/:id
POST   /upload
```

---

# Decisiones técnicas

## ¿Por qué JWT?

JWT permite autenticar solicitudes sin mantener una sesión tradicional en el servidor.

El token contiene información del usuario y es firmado mediante:

```text
JWT_SECRET
```

Solo el servidor conoce esta clave.

---

## ¿Por qué proteger PUT y DELETE?

Estas operaciones modifican o eliminan información persistida.

Por este motivo requieren autenticación antes de permitir el acceso.

---

## ¿Por qué proteger /upload?

La subida de archivos modifica el contenido almacenado por el servidor.

Proteger esta ruta evita que clientes no autenticados puedan cargar archivos libremente.

---

## ¿Por qué Multer?

Multer facilita el manejo de solicitudes:

```text
multipart/form-data
```

utilizadas para enviar archivos desde clientes HTTP.

También permite definir:

- ubicación;
- nombre;
- límite de tamaño;
- validación del tipo.

---

# Seguridad

La aplicación incorpora:

- variables sensibles mediante `.env`;
- `.env` excluido mediante `.gitignore`;
- JWT con tiempo de expiración;
- rutas protegidas;
- validación de token;
- validación de tipo de archivo;
- límite de tamaño;
- exclusión del campo `password` en respuestas de usuarios;
- validación de emails duplicados;
- manejo controlado de recursos inexistentes.

En esta versión del proyecto, el login trabaja con las credenciales almacenadas durante el desarrollo del Módulo 7. En una aplicación destinada a producción, las contraseñas deberían almacenarse mediante un mecanismo de hash seguro en lugar de texto plano.

---

# Pruebas realizadas en el Módulo 8

Se comprobó:

1. instalación de `jsonwebtoken`;
2. instalación de `multer`;
3. configuración de `JWT_SECRET`;
4. protección de `.env`;
5. creación de `POST /login`;
6. login exitoso;
7. generación de JWT;
8. login con credenciales incorrectas;
9. acceso a PUT sin token;
10. acceso a PUT con token;
11. acceso a DELETE sin token;
12. acceso a DELETE con token;
13. rechazo de token inválido;
14. creación de `POST /upload`;
15. subida exitosa de una imagen;
16. almacenamiento en `public/uploads`;
17. rechazo de archivo `.docx`;
18. rechazo de imagen superior a 2 MB.

---

# Integración de los tres módulos

## Módulo 6

Permitió establecer las bases del servidor:

```text
Node.js + Express + rutas + middlewares + contenido web + logs
```

## Módulo 7

Incorporó persistencia:

```text
MySQL + Sequelize + CRUD + relaciones + transacciones
```

## Módulo 8

Consolidó el backend como API:

```text
REST + JWT + rutas protegidas + subida de archivos
```

El resultado final es una aplicación backend modular capaz de recibir solicitudes HTTP, trabajar con información persistida, manejar relaciones entre entidades, aplicar seguridad mediante tokens y recibir archivos desde clientes externos.

---

# Reflexión técnica

El desarrollo progresivo permitió comprender cómo las distintas capas de una aplicación backend trabajan en conjunto.

En el Módulo 6 se construyó la base de la aplicación y se comprendió el flujo entre cliente, rutas, middlewares y controladores.

En el Módulo 7 se incorporó persistencia real. Sequelize permitió representar las tablas mediante modelos y trabajar con relaciones, mientras que las transacciones demostraron la importancia de mantener la consistencia de los datos frente a errores.

Finalmente, en el Módulo 8 la aplicación fue consolidada como una API RESTful. JWT permitió diferenciar rutas públicas de operaciones protegidas y Multer permitió trabajar con archivos enviados desde clientes externos.

La arquitectura modular permitió incorporar cada nueva funcionalidad sin reemplazar el trabajo anterior, sino extendiéndolo de forma progresiva.

---

# Resultado final

El proyecto quedó funcional, documentado y versionado.

La aplicación:

- funciona sobre Node.js y Express;
- sirve contenido web;
- responde en HTML y JSON;
- registra accesos;
- se conecta a MySQL;
- utiliza Sequelize ORM;
- implementa CRUD;
- utiliza relaciones entre modelos;
- utiliza transacciones;
- expone una API RESTful;
- implementa autenticación mediante JWT;
- protege rutas;
- valida tokens;
- permite subir archivos;
- valida tipo y tamaño de archivos;
- mantiene una arquitectura modular;
- se encuentra versionada mediante Git y publicada en GitHub.