const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Crear un nuevo usuario
router.post('/', userController.crearUsuario);

// Obtener todos los usuarios
router.get('/getUsers', userController.getUsers);

// Obtener un usuario por ID
router.post('/getUser', userController.getUser);

// Obtener un usuario por correo
router.post('/getUserByEmail', userController.getUserByEmail);

// Actualizar un usuario
router.post('/updateUser', userController.updateUser);

// Eliminar un usuario
router.post('/deleteUser', userController.deleteUser);

module.exports = router;
