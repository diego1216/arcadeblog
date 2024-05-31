const express = require('express');
const router = express.Router();

// Ruta para mostrar una publicación específica
router.get('/publicacion/:id', (req, res) => {
    const publicacionId = req.params.id;
    // Aquí puedes usar publicacionId para buscar la publicación en tu base de datos
    // y luego renderizarla o enviarla como respuesta al cliente
    res.send(`Mostrando la publicación con el ID ${publicacionId}`);
});

module.exports = router;
