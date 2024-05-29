const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');

// Configura Cookie Parser
app.use(cookieParser());
// Configura DotEnv
dotenv.config();
app.use(express.urlencoded({ extended: true }));

// Configura connect-flash
app.use(flash());

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

const router = require('./routes/routes');
app.use('/', router);

// Puerto en el que escucha el servidor 
const port = 4444;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
