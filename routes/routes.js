const express = require('express');
const router = express.Router();

const index = require('./index');
const login = require('./login');
const register = require('./registro');
const registrarUsuario = require('./userRegistro');
const publicacion = require('./publicacion');




router.use('/', index);
router.use('/registro', register);
router.use('/userRegistro', registrarUsuario);
router.use('/login', login);
router.use('/publicacion', publicacion);

module.exports = router;