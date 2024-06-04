const axios = require('axios');

async function getAll() {
    try {
        console.log('Obteniendo todas las publicaciones públicas');
        const response = await axios.get(`${process.env.BASE_URL}/publicacion/getAllPost`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener publicaciones públicas:', error.message);
        return []; // Devuelve un array vacío en caso de error
    }
}   

async function crearPublicacion(publicacion) {
    try {
        console.log('Creando publicación con datos:', { publicacion });
        await axios.post(`${process.env.BASE_URL}/publicacion/createNewPost`, {publicacion});
        console.log('se pudo registrar el usuario', publicacion);

    } catch (error) {
        console.error('Error al crear publicación:', error.message);
    }
}

module.exports = {
    getAll,
    crearPublicacion
};
