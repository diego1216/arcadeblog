const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleWare = require('../middlewares/authMiddleware');

// Ruta para manejar el registro de usuarios
router.post('/', async (req, res) => {
    const { nombre, correo, contraseña, confirmcontraseña } = req.body;

    console.log('nombre, email, password, confirmPassword = ', nombre, correo, contraseña, confirmcontraseña);
    // Verificar si la contraseña y su confirmación coinciden
    if (contraseña !== confirmcontraseña) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {
        const password_hash = await authMiddleWare.getHash(contraseña);

        // Registrar el usuario en la base de datos
        await userController.registrarUsuario(nombre, correo, password_hash);

        // Usuario insertado correctamente
        res.redirect('/login');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;