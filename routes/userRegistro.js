const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Archivo contenedor de querys para MySQL
const userModel = require('../models/userModels');
const authMiddleWare = require('../middlewares/authMiddleware')

// Ruta para manejar el registro de usuarios
router.post('/', async (req, res) => {
    const { nombre, email, password, confirmPassword } = req.body;

    // Verificar si la contraseña y su confirmación coinciden
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {

        // Verificar si el usuario ya está registrado
        const usuarioExistente = await userModel.Autentificacion( email );
        console.log('usuarioExistente = ', usuarioExistente);
        console.log('nombre, email. password = ', nombre, email, password);
        if (usuarioExistente.status == 400) {
            return res.status(400).send('El usuario ya está registrado');  // en un futuro lo voy a cambiar por un .pug que diga que el usuario ya esta registrado
        }
        else{
        password_hash = await authMiddleWare.getHash(password);

        // Registrar el usuario en la base de datos
        await userController.registrarUsuario(nombre, email, password_hash);

        // Usuario insertado correctamente
        res.redirect('/login');
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('llene los datos para el registro');
    }
});

module.exports = router;