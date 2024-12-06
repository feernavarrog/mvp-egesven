const roomModel = require('../models/roomModel');

// Controlador para crear una nueva habitación
exports.crearHabitacion = async (req, res) => {
    try {
        const habitacion = req.body;
        const result = await roomModel.crearHabitacion(habitacion);
        res.status(201).send('Habitación creada con éxito');
    } catch (err) {
        console.error("Error al crear la habitación:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para obtener todas las habitaciones
exports.getRooms = async (req, res) => {
    try {
        const result = await roomModel.getRooms();
        if (result.rows.length === 0) {
            res.status(404).send('No existen habitaciones registradas');
        } else {
            res.status(200).json(result.rows);
        }
    } catch (err) {
        console.error("Error al obtener habitaciones:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para obtener una habitación por ID
exports.getRoom = async (req, res) => {
    const { id_habitacion } = req.body;

    try {
        const result = await roomModel.getRoom(id_habitacion);
        if (result.rows.length === 0) {
            res.status(404).send('Habitación no encontrada');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error("Error al obtener la habitación:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para actualizar una habitación
exports.updateRoom = async (req, res) => {
    try {
        const id_habitacion = req.body.id_habitacion;
        const habitacion = req.body;
        const result = await roomModel.updateRoom(id_habitacion, habitacion);
        if (result.rowsAffected === 0) {
            res.status(404).send('Habitación no encontrada');
        } else {
            res.status(200).send('Habitación actualizada con éxito');
        }
    } catch (err) {
        console.error("Error al actualizar la habitación:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para eliminar una habitación
exports.deleteRoom = async (req, res) => {
    const { id_habitacion } = req.body;

    try {
        const result = await roomModel.deleteRoom(id_habitacion);
        if (result.rowsAffected === 0) {
            res.status(404).send('Habitación no encontrada');
        } else {
            res.status(200).send('Habitación eliminada con éxito');
        }
    } catch (err) {
        console.error("Error al eliminar la habitación:", err);
        res.status(500).send(err.message);
    }
};
