const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config(); // Importa y carga las variables de entorno desde el archivo .env

// Opciones para configurar la estrategia JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token JWT del encabezado de autorización Bearer
    secretOrKey: process.env.JWT_SECRET, // Clave secreta utilizada para firmar y verificar el token JWT
};

// Configura la estrategia JWT para la autenticación de Passport
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Intenta encontrar al usuario utilizando el ID almacenado en el token JWT
        const user = await User.findById(jwt_payload.userId);
  
        // Si se encuentra al usuario, se pasa al siguiente middleware con el usuario como argumento
        if (user) {
            return done(null, user);
        } else {
            // Si el usuario no se encuentra, se pasa al siguiente middleware con false como argumento
            return done(null, false);
        }
    } catch (err) {
        // Si ocurre algún error durante la búsqueda del usuario, se pasa al siguiente middleware con el error como argumento
        return done(err, false);
    }
}));

module.exports = passport; // Exporta Passport para su uso en otras partes de la aplicación
