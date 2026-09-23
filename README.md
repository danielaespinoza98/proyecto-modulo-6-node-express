# Node & Express Web App

## Descripción

Proyecto backend desarrollado progresivamente con **Node.js** y **Express.js**.

La primera etapa, correspondiente al **Módulo 6**, estableció la estructura inicial del servidor, las rutas públicas, respuestas HTML y JSON, archivos estáticos, middlewares y persistencia básica mediante un archivo de logs.

La segunda etapa, correspondiente al **Módulo 7**, amplía el mismo proyecto incorporando una base de datos relacional **MySQL**, acceso a datos mediante **Sequelize ORM** y **mysql2**, operaciones CRUD sobre usuarios y pedidos, relaciones entre modelos, consultas SQL manuales, validaciones y transacciones con COMMIT y ROLLBACK.

El proyecto mantiene una arquitectura modular basada en rutas, controladores, modelos, middlewares y servicios.

---

# Tecnologías utilizadas

## Tecnologías base

- Node.js 18 o superior
- Express.js
- npm
- dotenv
- nodemon
- módulo nativo `fs`
- Git
- GitHub

## Tecnologías incorporadas en el Módulo 7

- MySQL
- MySQL Workbench
- Sequelize ORM
- mysql2
- Postman

---

# Entorno utilizado durante las pruebas

- Node.js: `v22.23.2`
- npm: `10.9.8`
- Express: `^4.21.2`
- dotenv: `^16.4.7`
- nodemon: `^3.1.9`
- Sequelize: `6.37.8`
- mysql2: `3.24.4`

En la entrega correspondiente al **Módulo 6**, `npm install` reportó **0 vulnerabilidades**.

Después de incorporar Sequelize y mysql2 para el **Módulo 7**, npm mostró advertencias adicionales de severidad moderada. Estas se revisaron sin aplicar cambios forzados sobre las dependencias para evitar alterar el funcionamiento del proyecto.

---

# Estructura actual del proyecto

```text
.
├── controllers/
│   ├── mainController.js
│   ├── userController.js
│   └── orderController.js
│
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Order.js
│   └── History.js
│
├── routes/
│   ├── mainRoutes.js
│   ├── userRoutes.js
│   └── orderRoutes.js
│
├── services/
│   ├── database.js
│   └── logService.js
│
├── middlewares/
│   ├── errorHandler.js
│   ├── notFound.js
│   └── requestLogger.js
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── index.html
│
├── logs/
│   └── log.txt
│
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

La estructura separa responsabilidades:

- `controllers/`: contiene la lógica asociada a las solicitudes HTTP.
- `models/`: contiene los modelos Sequelize y sus relaciones.
- `routes/`: define los endpoints disponibles.
- `services/`: contiene funciones reutilizables, como conexión a base de datos y escritura de logs.
- `middlewares/`: contiene lógica intermedia para registro de solicitudes, manejo de rutas inexistentes y errores.
- `public/`: contiene los archivos HTML y CSS estáticos.
- `logs/`: almacena el archivo `log.txt`.

---

# Punto de entrada: index.js

Se utiliza `index.js` como punto de entrada de la aplicación.

El servidor puede iniciarse directamente mediante:

```bash
node index.js
```

El archivo centraliza:

- configuración de Express;
- variables de entorno;
- middlewares;
- archivos estáticos;
- rutas;
- conexión a MySQL;
- manejo de errores;
- inicio del servidor.

---

# Requisitos

Para ejecutar el proyecto se necesita:

- Node.js 18 o superior
- npm
- MySQL
- MySQL Workbench o una herramienta equivalente

Comprobar Node.js y npm:

```bash
node -v
npm -v
```

---

# Instalación

Desde la carpeta raíz del proyecto:

```bash
npm install
```

Las principales dependencias utilizadas son:

```text
express
dotenv
sequelize
mysql2
nodemon
```

---

# Ejecución

## Modo normal

```bash
npm start
```

Este comando ejecuta:

```bash
node index.js
```

## Modo desarrollo

```bash
npm run dev
```

Este comando utiliza **nodemon**, permitiendo reiniciar automáticamente el servidor cuando se modifican archivos.

Cuando la aplicación inicia correctamente se muestra:

```text
Conexión a MySQL establecida correctamente.
Servidor iniciado en http://localhost:3000
```

---

# Variables de entorno

La aplicación utiliza un archivo `.env` para almacenar configuraciones y credenciales sensibles.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=modulo7_node
DB_USER=root
DB_PASSWORD=tu_contrasena_mysql
```

El archivo `.env` está incluido en `.gitignore`:

```text
node_modules/
.env
```

Por esta razón, las credenciales reales no son almacenadas en GitHub.

El archivo `.env.example` sirve como referencia para configurar el proyecto sin exponer información sensible.

---

# PARTE 1 — MÓDULO 6

## Objetivo

La primera etapa del proyecto consistió en construir una aplicación backend básica y organizada con Node.js y Express, capaz de:

- iniciar un servidor;
- servir contenido HTML;
- responder mediante JSON;
- publicar archivos estáticos;
- trabajar con rutas;
- utilizar middlewares;
- registrar accesos en un archivo plano;
- manejar rutas inexistentes y errores.

---

# Rutas iniciales

## GET /

Entrega la página principal:

```text
http://localhost:3000/
```

El contenido HTML se encuentra en:

```text
public/index.html
```

La página informa que el servidor funciona correctamente y contiene un acceso hacia la ruta `/status`.

---

## GET /status

Entrega información del servidor en formato JSON:

```text
http://localhost:3000/status
```

Ejemplo:

```json
{
  "status": "ok",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2026-09-23T01:26:23.045Z",
  "uptimeSeconds": 731
}
```

Los valores de `timestamp` y `uptimeSeconds` cambian según la ejecución.

---

# Archivos estáticos

La carpeta `public` se expone mediante:

```javascript
express.static()
```

Archivos principales:

```text
public/index.html
public/css/styles.css
```

El archivo CSS puede comprobarse mediante:

```text
http://localhost:3000/css/styles.css
```

---

# Registro en archivo plano

El proyecto utiliza el middleware `requestLogger` y el servicio `logService`.

Los accesos se almacenan en:

```text
logs/log.txt
```

Cada registro contiene:

- fecha;
- hora;
- método HTTP;
- ruta accedida.

Ejemplo:

```text
22-09-2026 | 22:19:45 | GET /
22-09-2026 | 22:26:23 | GET /status
```

La escritura se realiza mediante el módulo nativo `fs`.

Durante las pruebas se registraron múltiples accesos, superando los tres registros mínimos utilizados como evidencia.

---

# Manejo de rutas inexistentes

La aplicación utiliza un middleware para responder de forma controlada cuando se solicita una ruta que no existe.

Ejemplo:

```text
GET /prueba404
```

Respuesta:

```json
{
  "status": "error",
  "message": "Ruta no encontrada",
  "data": null
}
```

Esto permite evitar respuestas desorganizadas o errores internos del servidor.

---

# Diferencia entre Node.js y Express

**Node.js** permite ejecutar JavaScript fuera del navegador y proporciona herramientas para trabajar con archivos, procesos, red y servidores.

**Express.js** funciona sobre Node.js y simplifica la creación de aplicaciones web mediante rutas, middlewares y métodos para manejar solicitudes y respuestas HTTP.

---

# Flujo servidor-cliente

```text
Cliente
   ↓
Solicitud HTTP
   ↓
Express
   ↓
Middleware
   ↓
Router
   ↓
Controller
   ↓
Respuesta HTML o JSON
   ↓
Cliente
```

Este flujo representa de forma simplificada cómo una solicitud es procesada por la aplicación.

---

# Pruebas realizadas en el Módulo 6

Se comprobó:

1. Node.js `v22.23.2`.
2. npm `10.9.8`.
3. instalación correcta mediante `npm install`.
4. ejecución mediante `npm run dev`.
5. ejecución mediante `npm start`.
6. funcionamiento de `GET /`.
7. funcionamiento de `GET /status`.
8. publicación de `public/css/styles.css`.
9. funcionamiento de `logs/log.txt`.
10. estructura modular del proyecto.
11. scripts de `package.json`.
12. manejo de rutas inexistentes.
13. inicialización del repositorio Git.
14. creación de commits parciales.
15. publicación del proyecto en GitHub.

---

# PARTE 2 — MÓDULO 7

## Objetivo

En esta segunda etapa, el mismo proyecto fue ampliado para trabajar con datos persistidos en una base de datos relacional.

La aplicación permite actualmente:

- conectarse a MySQL;
- utilizar variables de entorno para credenciales;
- crear modelos mediante Sequelize;
- realizar operaciones CRUD;
- ejecutar consultas mediante ORM;
- ejecutar SQL manual;
- validar errores;
- manejar relaciones entre modelos;
- utilizar transacciones;
- realizar COMMIT;
- realizar ROLLBACK.

---

# Base de datos

La base utilizada es:

```text
modulo7_node
```

El motor utilizado es **MySQL**.

Las tablas implementadas son:

```text
usuarios
pedidos
historiales_usuario
```

---

# Tabla usuarios

Campos principales:

```text
id
nombre
email
password
created_at
updated_at
```

Características principales:

- `id` es clave primaria.
- `id` utiliza `AUTO_INCREMENT`.
- `email` es único.
- `nombre`, `email` y `password` son obligatorios.

---

# Tabla pedidos

Campos principales:

```text
id
usuario_id
producto
total
created_at
```

`usuario_id` relaciona cada pedido con un usuario.

---

# Tabla historiales_usuario

Campos principales:

```text
id
usuario_id
descripcion
created_at
```

Esta tabla se utiliza para demostrar operaciones transaccionales.

---

# Conexión a MySQL

La conexión se encuentra centralizada en:

```text
services/database.js
```

Se utiliza Sequelize con el dialecto MySQL.

La conexión se valida mediante:

```javascript
await sequelize.authenticate();
```

Cuando la conexión funciona correctamente:

```text
Conexión a MySQL establecida correctamente.
```

Después se inicia Express:

```text
Servidor iniciado en http://localhost:3000
```

---

# Sequelize ORM

Se implementaron los siguientes modelos:

## User

Representa:

```text
usuarios
```

## Order

Representa:

```text
pedidos
```

## History

Representa:

```text
historiales_usuario
```

---

# Relación Usuario — Pedido

Se implementó una relación:

```text
Usuario 1 ───── N Pedidos
```

Esto significa que:

- un usuario puede tener muchos pedidos;
- cada pedido pertenece a un usuario.

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

La relación se consulta mediante `include`.

---

# CRUD DE USUARIOS

## GET /usuarios

Obtiene todos los usuarios utilizando Sequelize:

```text
GET http://localhost:3000/usuarios
```

La respuesta excluye el campo:

```text
password
```

para evitar exponer información sensible.

---

## GET /usuarios/sql

Obtiene los usuarios mediante SQL manual:

```text
GET http://localhost:3000/usuarios/sql
```

Consulta utilizada:

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

## POST /usuarios

Crea un usuario.

```text
POST http://localhost:3000/usuarios
```

Ejemplo:

```json
{
  "nombre": "Ana Pérez",
  "email": "ana@gmail.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "Usuario creado correctamente",
  "data": {}
}
```

La contraseña no se devuelve en la respuesta.

---

## PUT /usuarios/:id

Actualiza nombre y/o correo.

Ejemplo:

```text
PUT http://localhost:3000/usuarios/2
```

Body:

```json
{
  "nombre": "Bruno Soto Actualizado",
  "email": "bruno.actualizado@gmail.com"
}
```

---

## DELETE /usuarios/:id

Elimina un usuario.

Ejemplo:

```text
DELETE http://localhost:3000/usuarios/3
```

Antes de eliminar se comprueba que exista.

---

## Validación de usuario inexistente

Ejemplo:

```text
DELETE http://localhost:3000/usuarios/999
```

Respuesta:

```json
{
  "status": "error",
  "message": "Usuario no encontrado",
  "data": null
}
```

Código HTTP:

```text
404 Not Found
```

---

# CRUD DE PEDIDOS

## GET /pedidos

Obtiene todos los pedidos:

```text
GET http://localhost:3000/pedidos
```

---

## POST /pedidos

Crea un pedido:

```text
POST http://localhost:3000/pedidos
```

Ejemplo:

```json
{
  "usuario_id": 1,
  "producto": "Notebook",
  "total": 650000
}
```

Durante las pruebas también se crearon:

```text
Mouse
Teclado
```

---

## PUT /pedidos/:id

Modifica un pedido.

Ejemplo:

```text
PUT http://localhost:3000/pedidos/2
```

Body:

```json
{
  "producto": "Mouse inalámbrico",
  "total": 30000
}
```

---

## DELETE /pedidos/:id

Elimina un pedido.

Ejemplo:

```text
DELETE http://localhost:3000/pedidos/3
```

Durante la prueba se eliminó:

```text
Teclado
```

---

## Validación de pedido inexistente

Ejemplo:

```text
DELETE http://localhost:3000/pedidos/999
```

Respuesta:

```json
{
  "status": "error",
  "message": "Pedido no encontrado",
  "data": null
}
```

Código HTTP:

```text
404 Not Found
```

---

# Consulta de usuario y pedidos

La ruta:

```text
GET /usuarios/:id/pedidos
```

permite obtener un usuario y sus pedidos asociados.

Ejemplo:

```text
GET http://localhost:3000/usuarios/1/pedidos
```

Durante la prueba, Ana Pérez tenía asociados:

```text
Notebook
Mouse
```

Se utiliza Sequelize:

```javascript
include: [
  {
    model: Order,
    as: 'pedidos'
  }
]
```

Esto demuestra el uso de relaciones mediante ORM.

---

# SQL manual vs Sequelize ORM

Se implementaron dos formas de consultar usuarios.

## Consulta mediante ORM

```javascript
User.findAll();
```

Ruta:

```text
GET /usuarios
```

## Consulta mediante SQL manual

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

Ruta:

```text
GET /usuarios/sql
```

Ambas consultas entregan resultados equivalentes.

### Comparación

SQL manual permite:

- controlar directamente la consulta;
- definir explícitamente los campos;
- trabajar directamente con el lenguaje SQL.

Sequelize permite:

- trabajar mediante objetos JavaScript;
- utilizar modelos;
- definir relaciones;
- utilizar métodos reutilizables;
- facilitar consultas relacionadas mediante `include`.

---

# Transacciones

Se implementó una operación transaccional mediante:

```text
POST /usuarios/con-historial
```

Esta operación realiza:

```text
1. Creación de un usuario
2. Creación del historial del usuario
```

Ambas operaciones utilizan la misma transacción.

---

## Transacción exitosa

Durante la prueba se creó:

```text
Diego Rojas
```

junto con su historial.

Cuando ambas operaciones fueron exitosas se ejecutó:

```javascript
transaction.commit();
```

Resultado:

```text
Transacción exitosa
```

---

# ROLLBACK

Para comprobar la consistencia de la base de datos se implementó una prueba controlada.

Body utilizado:

```json
{
  "nombre": "Elena Silva",
  "email": "elena.rollback@gmail.com",
  "password": "123456",
  "forzarError": true
}
```

`forzarError` provoca intencionalmente que falle la creación del historial.

Cuando la segunda operación falla se ejecuta:

```javascript
transaction.rollback();
```

Respuesta:

```json
{
  "status": "error",
  "message": "Transacción revertida mediante ROLLBACK",
  "data": null
}
```

Posteriormente se verificó directamente en MySQL:

```sql
SELECT id, nombre, email
FROM usuarios
WHERE email = 'elena.rollback@gmail.com';
```

El usuario no fue encontrado.

Esto demuestra que la creación inicial también fue revertida y que la transacción protegió la consistencia de los datos.

---

# Validaciones implementadas

La aplicación incorpora validaciones para:

- campos obligatorios;
- emails duplicados;
- usuarios inexistentes;
- pedidos inexistentes;
- datos sensibles;
- consultas de base de datos;
- operaciones transaccionales;
- relaciones entre modelos.

---

# Formato de respuestas

Las respuestas exitosas siguen una estructura como:

```json
{
  "status": "ok",
  "message": "Operación realizada correctamente",
  "data": {}
}
```

Los errores utilizan:

```json
{
  "status": "error",
  "message": "Descripción del error",
  "data": null
}
```

---

# Pruebas realizadas en el Módulo 7

Se verificó:

1. creación de la base `modulo7_node`;
2. creación de la tabla `usuarios`;
3. instalación de Sequelize;
4. instalación de mysql2;
5. protección de `.env`;
6. conexión Node.js → MySQL;
7. creación de usuarios;
8. consulta de usuarios;
9. actualización de usuarios;
10. eliminación de usuarios;
11. validación de usuario inexistente;
12. creación de `historiales_usuario`;
13. transacción exitosa;
14. ROLLBACK provocado;
15. verificación del ROLLBACK en MySQL;
16. comparación SQL manual vs ORM;
17. creación de `pedidos`;
18. creación del modelo `Order`;
19. relación User 1:N Order;
20. creación de pedidos;
21. consulta usuario + pedidos mediante `include`;
22. actualización de pedidos;
23. eliminación de pedidos;
24. validación de pedido inexistente.

---

# Pruebas con Postman

Postman fue utilizado para probar:

```text
GET    /usuarios
GET    /usuarios/sql
POST   /usuarios
PUT    /usuarios/:id
DELETE /usuarios/:id

POST   /usuarios/con-historial
GET    /usuarios/:id/pedidos

GET    /pedidos
POST   /pedidos
PUT    /pedidos/:id
DELETE /pedidos/:id
```

---

# Seguridad de datos

Las credenciales de MySQL se almacenan únicamente en:

```text
.env
```

Este archivo no se versiona.

Además:

- el campo `password` se excluye de las consultas públicas;
- se valida duplicación de email;
- se comprueba la existencia de registros antes de actualizar o eliminar;
- las transacciones utilizan rollback cuando una operación falla.

---

# Decisiones técnicas

## ¿Por qué MySQL?

Se utilizó MySQL porque permite trabajar con una base de datos relacional, claves foráneas y transacciones, además de integrarse correctamente con Sequelize y mysql2.

## ¿Por qué mysql2?

`mysql2` funciona como cliente de conexión entre Node.js y MySQL y es compatible con Sequelize.

## ¿Por qué Sequelize?

Sequelize permite representar tablas mediante modelos JavaScript, trabajar con relaciones y realizar operaciones de base de datos mediante métodos del ORM.

Además, facilita operaciones como:

```javascript
findAll()
findByPk()
findOne()
create()
update()
destroy()
```

## ¿Por qué se utilizan variables de entorno?

Las variables de entorno permiten mantener las credenciales fuera del código fuente y evitar que contraseñas reales sean almacenadas en GitHub.

## ¿Por qué se actualizan solo ciertos campos?

En `PUT /usuarios/:id` se permite modificar principalmente nombre y correo electrónico para controlar qué información puede alterarse.

La contraseña no se modifica mediante esa ruta.

## ¿Qué validaciones se implementaron?

Se validan:

- campos requeridos;
- emails duplicados;
- existencia del usuario;
- existencia del pedido;
- resultados de consultas;
- errores transaccionales.

---

# Resultado general

El proyecto evolucionó desde una aplicación Node.js y Express con rutas, contenido HTML/JSON, archivos estáticos y persistencia básica mediante logs, hasta una aplicación conectada a una base de datos MySQL.

Actualmente permite:

- servir contenido web;
- consultar datos persistidos;
- crear datos;
- modificarlos;
- eliminarlos;
- trabajar mediante SQL manual;
- utilizar Sequelize ORM;
- manejar relaciones entre entidades;
- validar operaciones;
- realizar transacciones;
- ejecutar COMMIT y ROLLBACK.

El código mantiene una arquitectura modular y el repositorio conserva el historial progresivo del desarrollo correspondiente a los Módulos 6 y 7.