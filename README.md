# Node & Express Web App

## Descripción

Proyecto correspondiente al módulo 6. Su objetivo es construir una aplicación backend básica y organizada con **Node.js** y **Express**, capaz de servir contenido web, responder mediante HTML y JSON, publicar archivos estáticos y registrar accesos en un archivo de texto.

Durante las pruebas del proyecto se verificó el funcionamiento del servidor, las rutas públicas, los archivos estáticos, los scripts de ejecución y el registro de accesos en `logs/log.txt`.

## Tecnologías utilizadas

- Node.js 18 o superior
- Express.js
- npm
- dotenv
- nodemon
- módulo nativo `fs`

### Entorno utilizado durante las pruebas

- Node.js: `v22.23.2`
- npm: `10.9.8`
- Express: `^4.21.2`
- dotenv: `^16.4.7`
- nodemon: `^3.1.9`

La instalación de dependencias se realizó correctamente mediante `npm install`, con **0 vulnerabilidades detectadas** en la comprobación realizada.

## Estructura del proyecto

```text
.
├── controllers/
│   └── mainController.js
├── logs/
│   └── log.txt
├── middlewares/
│   ├── errorHandler.js
│   ├── notFound.js
│   └── requestLogger.js
├── public/
│   ├── css/
│   │   └── styles.css
│   └── index.html
├── routes/
│   └── mainRoutes.js
├── services/
│   └── logService.js
├── .env.example
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

La estructura separa responsabilidades:

- `routes/`: define las rutas o endpoints disponibles.
- `controllers/`: contiene la lógica de respuesta de las rutas.
- `middlewares/`: ejecuta funciones intermedias, como el registro de solicitudes y el manejo de errores.
- `services/`: concentra funciones reutilizables, como la escritura de registros en el archivo de logs.
- `public/`: contiene los archivos estáticos que Express expone al navegador.
- `logs/`: almacena el archivo `log.txt` con los accesos registrados.

## ¿Por qué se eligió `index.js`?

Se utiliza `index.js` porque es un nombre habitual para el punto de entrada de una aplicación Node.js y permite cumplir directamente con la ejecución solicitada mediante:

```bash
node index.js
```

El archivo centraliza la configuración inicial de Express, los middlewares, las rutas y el inicio del servidor.

## Requisitos

- Node.js 18 o superior
- npm

Para comprobar las versiones instaladas:

```bash
node -v
npm -v
```

## Instalación

Desde la carpeta raíz del proyecto, ejecutar:

```bash
npm install
```

El proyecto incluye `.env.example` con la variable:

```text
PORT=3000
```

Si se desea utilizar un archivo `.env`, se puede crear a partir de ese ejemplo.

## Ejecución

### Modo normal

```bash
npm start
```

Este comando ejecuta:

```bash
node index.js
```

### Modo desarrollo

```bash
npm run dev
```

Este comando utiliza **nodemon**, permitiendo reiniciar automáticamente el servidor cuando se modifican archivos del proyecto.

También puede iniciarse directamente con:

```bash
node index.js
```

Al iniciar correctamente se muestra:

```text
Servidor iniciado en http://localhost:3000
```

## Rutas disponibles

### `GET /`

Entrega la página principal en formato HTML desde `public/index.html`.

URL de prueba:

```text
http://localhost:3000/
```

La página muestra el título **Node & Express Web App**, informa que el servidor está funcionando correctamente y contiene un enlace hacia la ruta `/status`.

### `GET /status`

Entrega una respuesta JSON con información sobre el estado del servidor.

URL de prueba:

```text
http://localhost:3000/status
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

Los valores de `timestamp` y `uptimeSeconds` cambian en cada ejecución.

## Archivos estáticos

La carpeta `public` se expone mediante `express.static()`.

El proyecto contiene:

```text
public/index.html
public/css/styles.css
```

El archivo CSS puede comprobarse directamente desde el navegador mediante:

```text
http://localhost:3000/css/styles.css
```

Esto permite verificar que Express está sirviendo correctamente contenido estático.

## Registro en archivo plano

El proyecto utiliza el middleware `requestLogger` y el servicio `logService` para registrar accesos en:

```text
logs/log.txt
```

La escritura se realiza mediante el módulo nativo `fs` y cada registro contiene:

- fecha;
- hora;
- método HTTP;
- ruta accedida.

Ejemplo:

```text
22-09-2026 | 22:19:45 | GET /
22-09-2026 | 22:26:23 | GET /status
```

Durante las pruebas se generaron más de tres accesos, comprobando correctamente la persistencia en el archivo `log.txt`.

## Diferencia entre Node.js y Express

**Node.js** permite ejecutar JavaScript fuera del navegador y proporciona herramientas para trabajar con archivos, procesos, red y servidores.

**Express.js** funciona sobre Node.js y simplifica la construcción de aplicaciones web mediante rutas, middlewares y métodos de respuesta.

## Flujo servidor-cliente

```text
Cliente
  ↓ solicitud HTTP
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

Este flujo representa de manera simplificada cómo una solicitud llega al servidor y es procesada antes de devolver una respuesta al navegador.

## Manejo de rutas y errores

El proyecto utiliza rutas separadas de la lógica de control y cuenta con middlewares para manejar solicitudes no encontradas y errores generales.

Esto permite mantener el código organizado y separar las responsabilidades principales de la aplicación.

## Decisiones técnicas

- Se utiliza `index.js` como punto de entrada para mantener una ejecución directa y sencilla.
- Se mantiene una arquitectura modular para separar responsabilidades y facilitar el mantenimiento del código.
- Se utiliza `dotenv` para gestionar el puerto mediante una variable de entorno.
- La escritura de logs se encuentra separada en un servicio para evitar duplicar lógica.
- Se utiliza `public/` junto con `express.static()` para servir contenido HTML y CSS.
- Se utiliza `nodemon` únicamente como dependencia de desarrollo para facilitar las pruebas y modificaciones del servidor.

## Pruebas realizadas

Durante la ejecución del proyecto se comprobó lo siguiente:

1. `node -v` mostró Node.js `v22.23.2`.
2. `npm -v` mostró npm `10.9.8`.
3. `npm install` finalizó correctamente y reportó 0 vulnerabilidades.
4. `npm run dev` inició el servidor mediante nodemon.
5. `npm start` inició correctamente el servidor mediante `node index.js`.
6. La ruta `/` mostró correctamente la página HTML.
7. La ruta `/status` devolvió correctamente una respuesta JSON.
8. `public/css/styles.css` fue servido correctamente mediante `express.static()`.
9. `logs/log.txt` registró múltiples accesos a `/` y `/status`.
10. La estructura modular y las dependencias fueron verificadas desde Visual Studio Code.

## Evidencias obtenidas

Las pruebas realizadas se respaldan mediante capturas de pantalla de:

1. versiones de Node.js y npm e instalación de dependencias;
2. ejecución con `npm run dev`;
3. página principal en `http://localhost:3000/`;
4. respuesta JSON de `http://localhost:3000/status`;
5. archivo estático `http://localhost:3000/css/styles.css`;
6. archivo `logs/log.txt` con múltiples accesos;
7. estructura del proyecto y contenido de `package.json`;
8. ejecución correcta con `npm start`.

## Resultado

La aplicación queda funcional y organizada, con servidor Express operativo, rutas públicas, respuestas HTML y JSON, publicación de archivos estáticos, persistencia básica en archivo plano y scripts de ejecución correctamente configurados.
