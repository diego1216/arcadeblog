const express = require('express');
const router = express.Router();


// Rutas públicas
router.get('/', (req, res) => {
  res.render('index', { title: req.user != null ? `Player: ${req.user.nombre}` : 'insert coin', user: req.user != null ? `${req.user.nombre}` : ''});
});


module.exports = router;