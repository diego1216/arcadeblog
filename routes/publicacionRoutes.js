const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');
const multer = require('multer');
const path = require('path');

router.get('/', publicacionController.getPublicaciones);
router.post('/publicaciones/createNewPost', publicacionController.crearPublicacion);

module.exports = router;
