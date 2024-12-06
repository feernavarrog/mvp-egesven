const database = require('../services/database');

// Obtener todos los usuarios
async function getRooms() {
    const sql = `
        SELECT 
            h.id_habitacion,
            h.numero_hab,
            h.info_hab,
            h.equipamiento_hab,
            h.valor_diario_hab,
            h.id_ubicacion,
            h.id_estado,
            h.id_categoria,
            c.desc_cat AS categoria
        FROM 
            habitacion h
        JOIN 
            categoria_hab c
        ON 
            h.id_categoria = c.id_categoria
    `;
    return await database.executeQuery(sql);
}

// Crear una nueva habitación
async function crearHabitacion(habitacion) {
    const sql = `INSERT INTO habitacion (numero_hab, info_hab, equipamiento_hab, valor_diario_hab, id_ubicacion, id_estado, id_categoria)
                 VALUES (:numero_hab, :info_hab, :equipamiento_hab, :valor_diario_hab, :id_ubicacion, :id_estado, :id_categoria)`;

    const binds = {
        numero_hab: habitacion.numero_hab,
        info_hab: habitacion.info_hab,
        equipamiento_hab: habitacion.equipamiento_hab,
        valor_diario_hab: habitacion.valor_diario_hab,
        id_ubicacion: habitacion.id_ubicacion,
        id_estado: habitacion.id_estado,
        id_categoria: habitacion.id_categoria
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al crear habitación:", error);
        throw error;
    }
}

// Obtener una habitación por ID
async function getRoom(id_habitacion) {
    const sql = `SELECT * FROM habitacion WHERE id_habitacion = :id_habitacion`;
    const binds = { id_habitacion };
    return await database.executeQuery(sql, binds);
}

// Actualizar una habitación
async function updateRoom(id_habitacion, habitacion) {
    const sql = `UPDATE habitacion
                 SET numero_hab = :numero_hab,
                     info_hab = :info_hab,
                     equipamiento_hab = :equipamiento_hab,
                     valor_diario_hab = :valor_diario_hab,
                     id_ubicacion = :id_ubicacion,
                     id_estado = :id_estado,
                     id_categoria = :id_categoria
                 WHERE id_habitacion = :id_habitacion`;

    const binds = {
        numero_hab: habitacion.numero_hab,
        info_hab: habitacion.info_hab,
        equipamiento_hab: habitacion.equipamiento_hab,
        valor_diario_hab: habitacion.valor_diario_hab,
        id_ubicacion: habitacion.id_ubicacion,
        id_estado: habitacion.id_estado,
        id_categoria: habitacion.id_categoria,
        id_habitacion: id_habitacion
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al actualizar habitación:", error);
        throw error;
    }
}

// Eliminar una habitación
async function deleteRoom(id_habitacion) {
    const sql = `DELETE FROM habitacion WHERE id_habitacion = :id_habitacion`;
    const binds = { id_habitacion };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al eliminar habitación:", error);
        throw error;
    }
}

// Exportar las funciones
module.exports = {
    getRooms,
    crearHabitacion,
    getRoom,
    updateRoom,
    deleteRoom
};
