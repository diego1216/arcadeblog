const axios = require('axios');

// Clase Usuario que representa un usuario con sus atributos
class Usuario {
    constructor(id, nombre, email, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }
}

// Función asincrónica para registrar un nuevo usuario
async function registrarUsuario(dataSegura) {
    try {
        // Registra el usuario haciendo una solicitud POST al endpoint correspondiente
        console.log('Objeto usuario recibido por el modelo:', dataSegura);
        await axios.post(`${process.env.BASE_URL}/usuarios/registrar`, { dataSegura });
        console.log('Se pudo registrar el usuario:', dataSegura);
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
    }
}

// Función asincrónica para iniciar sesión de un usuario
async function logearUsuario(dataSegura) {
    try {
        console.log('Iniciando sesión del usuario');
        // Realiza una solicitud POST al endpoint correspondiente para iniciar sesión
        const response = await axios.post(`${process.env.BASE_URL}/usuarios/login`, {dataSegura});
        // Extrae los datos del usuario de la respuesta y crea una instancia de Usuario
        const usuario = response.data;
        console.log('Nuevo usuario:', usuario);
        return new Usuario(usuario.id, usuario.nombre, usuario.email, usuario.contraseña);
    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
    }
}

// Exporta las funciones y la clase para su uso en otros archivos
module.exports = {
    registrarUsuario,
    logearUsuario,
    Usuario
};
