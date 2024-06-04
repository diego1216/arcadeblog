const express = require('express');
const router = express.Router(); // Crea un enrutador de Express

// Importa los controladores de cada ruta
const index = require('./index');
const register = require('./registro');
const login = require('./login');
const publicacion = require('./publicacion');
const userRegistro = require('./userRegistro');
const logout = require('./logout');

// Define las rutas y los controladores correspondientes
router.use('/', index); // Ruta raíz
router.use('/registro', register); // Ruta para el registro de usuarios
router.use('/login', login); // Ruta para iniciar sesión
router.use('/publicacion', publicacion); // Ruta para las publicaciones
router.use('/userRegistro', userRegistro); // Ruta para registrar usuarios
router.use('/logout', logout); // Ruta para cerrar sesión

// Exporta el enrutador para su uso en otros archivos
module.exports = router;
