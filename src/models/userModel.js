const database = require('../services/database');

// Obtener todos los usuarios
async function getUsers() {
    const sql = `SELECT * FROM usuario`;
    return await database.executeQuery(sql);
}

// Crear un nuevo usuario
async function crearUsuario(usuario) {
    const sql = `INSERT INTO usuario (correo_electronico, clave_usuario, nombre_usuario, apellido_usuario, id_tipo_usuario)
                 VALUES (:correo_electronico, :clave_usuario, :nombre_usuario, :apellido_usuario, :id_tipo_usuario)`;

    const binds = {
        correo_electronico: usuario.correo_electronico,
        clave_usuario: usuario.clave_usuario,
        nombre_usuario: usuario.nombre_usuario,
        apellido_usuario: usuario.apellido_usuario,
        id_tipo_usuario: usuario.id_tipo_usuario
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

// Obtener un usuario por ID
async function getUser(id_usuario) {
    const sql = `SELECT * FROM usuario WHERE id_usuario = :id_usuario`;
    const binds = { id_usuario };
    return await database.executeQuery(sql, binds);
}

// Obtener un usuario por Correo
async function getUserByEmail(correo_usuario) {
    const sql = `SELECT * FROM usuario WHERE correo_electronico = :correo_usuario`;
    const binds = { correo_usuario };
    return await database.executeQuery(sql, binds);
}

// Actualizar un usuario
async function updateUser(id_usuario, usuario) {
    const sql = `UPDATE usuario
                 SET correo_electronico = :correo_electronico, 
                     clave_usuario = :clave_usuario, 
                     nombre_usuario = :nombre_usuario, 
                     apellido_usuario = :apellido_usuario, 
                     id_tipo_usuario = :id_tipo_usuario
                 WHERE id_usuario = :id_usuario`;

    const binds = {
        correo_electronico: usuario.correo_electronico,
        clave_usuario: usuario.clave_usuario,
        nombre_usuario: usuario.nombre_usuario,
        apellido_usuario: usuario.apellido_usuario,
        id_tipo_usuario: usuario.id_tipo_usuario,
        id_usuario: id_usuario
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
}

// Eliminar un usuario
async function deleteUser(id_usuario) {
    const sql = `DELETE FROM usuario WHERE id_usuario = :id_usuario`;
    const binds = { id_usuario };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}

// Exporta las funciones de negocio correctamente
module.exports = {
    getUserByEmail,
    getUsers,
    crearUsuario,
    getUser,
    updateUser,
    deleteUser
};
