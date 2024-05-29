require('dotenv').config();
const axios = require('axios');
const passport = require('passport');

// Lee el valor de BASE_URL desde el archivo .env
const BASE_URL = process.env.BASE_URL;

class Usuario {
    constructor(id, nombre, email, password_hash) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password_hash = password_hash;
    }
}

async function registrarUsuario(dataSegura) {
    try {
        console.log('dataSegura = ',dataSegura.nombre);
        await axios.post(`${BASE_URL}/registrar`, { dataSegura });
        console.log('se pudo registrar el usuario', dataSegura);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

async function logearUsuario(dataSegura) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {dataSegura});
        const usuario = response.data;
        return new Usuario(usuario.id, usuario.nombre, usuario.email, usuario.password_hash);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    }
}

// Enviar datos al backend para verificar si el usuario está registrado
async function Autentificacion( email ) {
    try {
        const response = await axios.post(`${BASE_URL}/authenticate`, { email });
        console.log(response.data, email);
        return response.data; // Puede ser 'true' si el usuario está registrado, 'false' si no lo está
    } catch (error) {
        console.error('Error al verificar registro:', error);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    logearUsuario,
    Autentificacion
};
