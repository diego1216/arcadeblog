const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios')

// Define la ruta para el login
router.get('/', (req, res) => {
  res.render('login', { title: '', user: req.user != null ? `${req.user.nombre}` : '' });
 });


// Define la ruta para el login
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
      await userModel.logearUsuario( email, password);
      // Extrae el token JWT de la respuesta de la API
      const token = response.data.token;
  
      // Establece la cookie con el token JWT
      res.cookie('token', token, { httpOnly: true, secure: false });
  
      // Redirige al usuario a la página del carrito u otra página deseada
      res.redirect('/');
    } catch (error) {
      console.error('Error de inicio', error);
      res.status(500).send('Error interno ');
    }
  });
  
  module.exports = router;