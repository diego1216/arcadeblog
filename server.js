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

// Suponiendo que tienes una lista de publicaciones
const publicaciones = [
  {
    id: 1,
    titulo: 'Título de la Publicación 1',
    contenido: 'Contenido de la Publicación 1',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwfGB6dUnr2_mIK2bbLG3JM0IWyfATg0efwQ&s'
},

  { 
      id: 2, 
      titulo: 'Título de la Publicación 2', 
      contenido: 'Contenido de la Publicación 2', 
      imagen: 'ruta/a/la/imagen2.jpg', // Ruta de la imagen
      video: 'ruta/a/el/video2.mp4' // Ruta del video
  },
];

// Ruta para /publicacion
app.get('/publicacion', (req, res) => {
  // Renderiza una plantilla (por ejemplo, usando un motor de plantillas como EJS o Handlebars)
  // y pasa la lista de publicaciones como datos a la plantilla
  res.render('publicacion', { publicaciones: publicaciones });
});

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
