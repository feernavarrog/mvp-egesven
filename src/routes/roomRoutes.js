const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Crear una nueva habitación
router.post('/', roomController.crearHabitacion);

// Obtener todas las habitaciones
router.get('/getRooms', roomController.getRooms);

// Obtener una habitación por ID
router.post('/getRoom', roomController.getRoom);

// Actualizar una habitación
router.post('/updateRoom', roomController.updateRoom);

// Eliminar una habitación
router.post('/deleteRoom', roomController.deleteRoom);

module.exports = router;
