const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await req.logout(async (err) => {
      if (err) {
        // Manejo del error
        console.error(err);
      }
      await req.session.destroy((err) => {   // Eliminar la sesión completa
        if (err) {
          console.error('Error al destruir la sesión:', err);
          return res.status(500).send('Error al cerrar sesión');
        }
        console.log('req.session.destroy finalizado correctamente');
      });
      // Eliminar el contenido del almacén de sesiones
      await req.sessionStore.clear((err) => {
        if (err) {
          console.error('Error al limpiar el almacén de sesiones:', err);
          return res.status(500).send('Error al cerrar sesión');
        }
        console.log('req.sessionStore.clear finalizado correctamente');
      });
      res.clearCookie('token');
      res.redirect('/'); // Redirigir a la página principal
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).send('Error al cerrar sesión');
  }
});

module.exports = router;