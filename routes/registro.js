const express = require('express');
const router = express.Router();


// Define la ruta para el registro
router.get('/', (req, res) => {
    res.render('register');
  });
  

module.exports = router;