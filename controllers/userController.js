const userModel = require('../models/userModels');
const authMiddleWare = require('../middlewares/authMiddleware');

// Función asincrónica que sirve para registrar al usuario
async function registrarUsuario(nombre, email, password_hash) {
        console.log('nombre, email, password_hash', nombre, email, password_hash);
        // Se encriptan los datos
        let [nombreSeguro, emailSeguro, passwordHashSeguro] = await Promise.all([
            authMiddleWare.encryptData(nombre),
            authMiddleWare.encryptData(email),
            authMiddleWare.encryptData(password_hash)
        ]);
    
        console.log('nombreSeguro = ', nombreSeguro, ' emailSeguro = ', emailSeguro, ' PasswordHashSeguro = ', passwordHashSeguro);
        
        const Usuarios = {
            nombre: nombreSeguro,
            email: emailSeguro,
            password: passwordHashSeguro
        }
        return await userModel.registrarUsuario(Usuarios);
    
}



// Función asincrónica para logear a un usuario
async function logearUsuario(usuario) {
    console.log('logearUsuario objeto usuario = ', usuario);
    console.log('logearUsuario email = ', usuario.email);
    console.log('logearUsuario password = ', usuario.password);

    // Se encriptan el nombre y la contraseña de forma paralela
    let [emailSeguro, passwordSeguro] = await Promise.all([
        authMiddleWare.encryptData(usuario.email),
        authMiddleWare.encryptData(usuario.password)
    ]);

    console.log(' encriptaciones = '. emailSeguro, passwordSeguro);

    const Usuarios = {
        email: emailSeguro,
        password: passwordSeguro
    }
    console.log("usuario = ", Usuarios)
    // Se intenta logear al usuario en la aplicación
    return await userModel.logearUsuario(Usuarios);
}



module.exports = {
    registrarUsuario,
    logearUsuario,
};