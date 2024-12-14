const userModel = require('../models/userModel');

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const usuario = req.body;
        await userModel.crearUsuario(usuario);
        res.status(201).send('Usuario creado con éxito');
    } catch (err) {
        console.error("Error al crear usuario:", err);
        res.status(500).send(err.message);
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const result = await userModel.getUsers();
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para obtener un usuario por ID
exports.getUser = async (req, res) => {
    const { id_usuario } = req.body;

    try {
        const result = await userModel.getUser(id_usuario);
        if (result.rows.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para obtener un usuario por correo
exports.getUserByEmail = async (req, res) => {
    const { correo_usuario } = req.body;

    try {
        const result = await userModel.getUserByEmail(correo_usuario);
        if (result.rows.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        res.status(500).send(err.message);
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { id_usuario, ...usuario } = req.body;
        await userModel.updateUser(id_usuario, usuario);
        res.status(200).send('Usuario actualizado con éxito');
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).send(err.message);
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        await userModel.deleteUser(id_usuario);
        res.status(200).send('Usuario eliminado con éxito');
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).send(err.message);
    }
};
