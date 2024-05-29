const usuarioModel = require('../models/userModels');
const authMiddleware = require('../middlewares/authMiddleware');

async function registrarUsuario(req, res) {
    const { nombre, correo, contraseña, confirmcontraseña } = req.body;
    console.log(nombre, correo, contraseña, confirmcontraseña);
  
    try {
      if (contraseña !== confirmcontraseña) {
        return res.status(400).send('Las contraseñas no coinciden');
      }
  
      const correoExistente = await usuarioModel.obtenerPorEmail(correo);
      if (correoExistente) {
        return res.status(400).send('El usuario ya está registrado');
      }
  
      const hashedPassword = await authMiddleware.getHash(contraseña);
      console.log("Hashed Password:", hashedPassword);
  
      await usuarioModel.registrar(nombre, correo, hashedPassword);
      console.log("Se registro el usuario correctamente", nombre, correo, hashedPassword);
  
  
      res.redirect('/login');
    } catch (error) {
      console.error("error en el registro", error.message);
      res.status(500).send('llene los espacios para el registro');
    }
  }

async function obtenerUsuarioPorusuario(req, res) {
  try {
    const { usuario } = req.params;
    const usuarioEncontrado = await usuarioModel.obtenerPorusuario(usuario);
    if (usuarioEncontrado) {
      res.json(usuarioEncontrado);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener usuario por nombre:', error);
    res.status(500).send('Error al obtener usuario por nombre');
  }
}

async function obtenerUsuarioPorId(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.obtenerPorId(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener usuario por ID');
  }
}

module.exports = {
  registrarUsuario,
  obtenerUsuarioPorusuario,
  obtenerUsuarioPorId,
};
