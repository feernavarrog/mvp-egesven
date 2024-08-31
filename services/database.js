const oracledb = require('oracledb');
const path = require('path');

// Inicializar la conexión a la base de datos
async function initialize() {
    process.env.TNS_ADMIN = path.resolve(__dirname, '../Wallet_REEFRESERVE');
    try {
        await oracledb.createPool({
            user: "reef_user",
            password: "ReefReserve2024",
            connectString: "reefreserve_high",
            walletLocation: path.resolve(__dirname, '../Wallet_REEFRESERVE'),  // Ruta absoluta
            walletPassword: "HotelRR2024!"
        });
        console.log("Base de datos conectada correctamente.");
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err);
        throw err;
    }
}

// Cerrar la conexión a la base de datos
async function close() {
    try {
        await oracledb.getPool().close(0);
        console.log("Conexión a la base de datos cerrada.");
    } catch (err) {
        console.error("Error al cerrar la conexión a la base de datos:", err);
    }
}

// Ejecutar una consulta a la base de datos
async function executeQuery(sql, binds = [], options = {}) {
    let connection;

    options.autoCommit = true;  // Auto-commit después de ejecutar

    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(sql, binds, options);
        return result;
    } catch (err) {
        console.error("Error en la ejecución de la consulta:", err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error al cerrar la conexión:", err);
            }
        }
    }
}

// Exportar las funciones de negocio
module.exports = {
    executeQuery,
    initialize,
    close
};