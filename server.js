const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('./controllers/userController');
const SQLiteStore = require('connect-sqlite3')(session);
const auth = require('./middlewares/authMiddleware');

// Configura Cookie Parser
app.use(cookieParser());

// Configura DotEnv
dotenv.config();
app.use(express.urlencoded({ extended: true }));

// Configura connect-flash
app.use(flash());

// Configura sesión
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar la sesión
  resave: false,
  saveUninitialized: true,
  store: new SQLiteStore({ db: 'sessionsDB.sqlite', table: 'sessions' }), // Almacena las sesiones en SQLite
  cookie: { secure: false } // Cookie no segura, útil en desarrollo
}));

// Inicializa Passport y lo usa con sesiones
app.use(passport.initialize());
app.use(passport.session());

// Configura la estrategia de autenticación local
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    console.log('Se pasa por Passport');
    try {
      // Intenta iniciar sesión con el controlador de usuarios
      const user = await userController.logearUsuario({ email, password });
      if (!user) {
        return done(null, false, { message: 'Correo o contraseña incorrecto' });
      }
      console.log('Usuario:', user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serializa y deserializa el usuario para su almacenamiento en la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

// Agrega el usuario autenticado a res.locals para su uso en las plantillas
app.use(auth.addUserToLocals);

// Configura la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

// Importa y usa las rutas definidas en './routes/routes.js'
const router = require('./routes/routes');
app.use('/', router);

// Lista de publicaciones (ejemplo)
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
