const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware');


// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', {title: 'Iniciar sesión'});
});

router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  const token = authMiddleware.generateToken(req.user.id, '1h');
  res.cookie('token', token, { httpOnly: true, secure: false });
  res.redirect('/');
});

  module.exports = router;