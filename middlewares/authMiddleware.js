const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const privateKey = fs.readFileSync('./config/jwtRS256.key'); // Lee la llave privada desde un archivo

// Middleware para autenticar usuarios mediante tokens JWT
async function authenticate(req, res, next) {
    // Revisa si existe un token en las cookies
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la llave privada
        const decoded = jwt.verify(token, privateKey);

        // Almacena el ID del usuario extraído del token en el objeto de solicitud (request)
        req.userId = decoded.userId;

        // Continúa con el siguiente middleware
        next();

    } catch (err) {
        // Si falla la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// Función para generar un token JWT
function generateToken(data, expirationTime) {
    // Firma el token utilizando la llave privada
    return jwt.sign({ data }, privateKey, { algorithm: 'RS256', expiresIn: expirationTime });
}

// Función para encriptar datos utilizando AES-256-GCM
function encryptData(text) {
    // Obtiene la clave y el IV desde las variables de entorno
    const key = Buffer.from(process.env.AES_PRIVATE_KEY, 'hex');
    const iv = Buffer.from(process.env.AES_IV, 'hex');

    // Crea un cifrador AES con GCM (Modo de Contraseña Galois/Counter)
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    // Actualiza el texto plano a través del cifrado
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
 
    // Retorna el texto cifrado junto con el IV y el tag de autenticación
    return iv.toString('hex') + ':' + cipher.getAuthTag().toString('hex') + ':' + encrypted;
}

// Función asincrónica para obtener el hash de una contraseña usando bcrypt
async function getHash(passwordString) {
    // Obtiene el número de rondas de sal desde las variables de entorno
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
   
    // Genera el hash de la contraseña utilizando bcrypt
    const password_hash = await bcrypt.hash(passwordString, saltRounds);

    // Retorna el hash de la contraseña
    return password_hash;
}

// Middleware para agregar el usuario autenticado a la variable locals en la respuesta
function addUserToLocals(req, res, next) {
    // Verifica si el usuario está autenticado
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Agrega el usuario autenticado a res.locals
    } else {
        res.locals.user = null; // Si no está autenticado, establece res.locals.user como null
    }
    next(); // Continúa con el siguiente middleware
}

// Exporta las funciones y middleware para su uso en otros archivos
module.exports = {
    authenticate,
    encryptData,
    generateToken,
    getHash,
    addUserToLocals
};   
