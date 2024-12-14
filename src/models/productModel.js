const database = require('../services/database');

// Obtener todos los productos
async function getProducts() {
    const sql = `
        SELECT 
            p.id_producto,
            p.nom_prod,
            p.desc_prod,
            p.stock,
            p.precio,
            c.desc_categoria AS categoria
        FROM 
            producto p
        JOIN 
            categoria_producto c
        ON 
            p.id_categoria = c.id_categoria
    `;
    return await database.executeQuery(sql);
}

// Eliminar un producto por ID
async function deleteProduct(id_producto) {
    const sql = `DELETE FROM producto WHERE id_producto = :id_producto`;
    const binds = { id_producto };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

// Crear un nuevo producto
async function createProduct(product) {
    const sql = `
        INSERT INTO producto (nom_prod, desc_prod, stock, precio, id_categoria)
        VALUES (:nom_prod, :desc_prod, :stock, :precio, :id_categoria)
    `;
    const binds = {
        nom_prod: product.nom_prod,
        desc_prod: product.desc_prod,
        stock: product.stock,
        precio: product.precio,
        id_categoria: product.id_categoria
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
}

// Actualizar un producto
async function updateProduct(id_producto, product) {
    const sql = `
        UPDATE producto
        SET nom_prod = :nom_prod,
            desc_prod = :desc_prod,
            stock = :stock,
            precio = :precio,
            id_categoria = :id_categoria
        WHERE id_producto = :id_producto
    `;

    const binds = {
        id_producto,
        nom_prod: product.nom_prod,
        desc_prod: product.desc_prod,
        stock: product.stock,
        precio: product.precio,
        id_categoria: product.id_categoria
    };

    try {
        const result = await database.executeQuery(sql, binds);
        return result;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
