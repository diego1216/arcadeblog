const PublicacionModel = require('../models/publicacionModel');

// Obtener todas las publicaciones
async function getPublicaciones(req, res) {
    try {
        const publicaciones = await PublicacionModel.getAll();
        console.log('Publicaciones obtenidas:', publicaciones);
        res.render('publicacion', { title: 'DATE A LIVE FANS', publicaciones: publicaciones || [] });
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        res.status(500).send('Error al obtener publicaciones');
    }
}

// Obtener todas las publicaciones públicas
async function getPublicacionesPublicas(req, res) {
    try {
        const publicaciones = await PublicacionModel.getAll();
        console.log('Publicaciones públicas obtenidas:', publicaciones);
        res.json(publicaciones);
    } catch (error) {
        console.error('Error al obtener publicaciones públicas:', error.message);
        res.status(500).send('Error al obtener publicaciones');
    }
}

// Crear una nueva publicación
async function crearPublicacion(req, res) {
    try {
        const { usuario_id, titulo, contenido, tipo, imagen, video } = req.body;
        console.log('Datos de la nueva publicación:', usuario_id, titulo, contenido, tipo, imagen, video);

        const publicacion = {
            usuario_id,
            titulo,
            contenido,
            tipo,
            imagen,
            video
        };

        console.log('Objeto publicacion:', publicacion);

        await PublicacionModel.crearPublicacion(publicacion);

        console.log('Publicación creada exitosamente');
        res.status(201).send('Publicacion creada');
    } catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).send('Error al crear publicacion');
    }
}

module.exports = {
    getPublicaciones,
    getPublicacionesPublicas,
    crearPublicacion
};
