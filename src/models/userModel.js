const database = require('../services/database');

// Obtener todos los usuarios
async function getUsers() {
    const sql = `
        SELECT 
            u.id_usuario,
            u.nombre_usuario,
            u.correo_usuario,
            u.dir_envio,
            p.desc_perfil AS perfil
        FROM usuario u
        JOIN perfil_usuario p
        ON u.id_perfil = p.id_perfil
    `;
    return await database.executeQuery(sql);
}

// Crear un nuevo usuario
async function crearUsuario(usuario) {
    const sql = `
        INSERT INTO usuario (nombre_usuario, correo_usuario, clave_usuario, dir_envio, id_perfil)
        VALUES (:nombre_usuario, :correo_usuario, :clave_usuario, :dir_envio, :id_perfil)
    `;
    const binds = {
        nombre_usuario: usuario.nombre_usuario,
        correo_usuario: usuario.correo_usuario,
        clave_usuario: usuario.clave_usuario,
        dir_envio: usuario.dir_envio || null,
        id_perfil: usuario.id_perfil
    };

    return await database.executeQuery(sql, binds);
}

// Obtener un usuario por ID
async function getUser(id_usuario) {
    const sql = `SELECT * FROM usuario WHERE id_usuario = :id_usuario`;
    const binds = { id_usuario };
    return await database.executeQuery(sql, binds);
}

// Obtener un usuario por Correo
async function getUserByEmail(correo_usuario) {
    const sql = `SELECT * FROM usuario WHERE correo_usuario = :correo_usuario`;
    const binds = { correo_usuario };
    return await database.executeQuery(sql, binds);
}

// Actualizar un usuario
async function updateUser(id_usuario, usuario) {
    const sql = `
        UPDATE usuario
        SET nombre_usuario = :nombre_usuario,
            correo_usuario = :correo_usuario,
            clave_usuario = :clave_usuario,
            dir_envio = :dir_envio,
            id_perfil = :id_perfil
        WHERE id_usuario = :id_usuario
    `;
    const binds = {
        id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        correo_usuario: usuario.correo_usuario,
        clave_usuario: usuario.clave_usuario,
        dir_envio: usuario.dir_envio || null,
        id_perfil: usuario.id_perfil
    };

    return await database.executeQuery(sql, binds);
}

// Eliminar un usuario
async function deleteUser(id_usuario) {
    const sql = `DELETE FROM usuario WHERE id_usuario = :id_usuario`;
    const binds = { id_usuario };

    return await database.executeQuery(sql, binds);
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
