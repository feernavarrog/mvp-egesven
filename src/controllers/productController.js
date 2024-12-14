const productModel = require('../models/productModel');

// Controlador para obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const result = await productModel.getProducts();
        if (result.rows.length === 0) {
            res.status(404).send('No existen productos registrados');
        } else {
            res.status(200).json(result.rows);
        }
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para eliminar un producto
exports.deleteProduct = async (req, res) => {
    const { id_producto } = req.body;

    try {
        const result = await productModel.deleteProduct(id_producto);
        if (result.rowsAffected === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.status(200).send('Producto eliminado con éxito');
        }
    } catch (err) {
        console.error("Error al eliminar el producto:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para crear un producto
exports.createProduct = async (req, res) => {
    try {
        const product = req.body;
        const result = await productModel.createProduct(product);
        res.status(201).send('Producto creado con éxito');
    } catch (err) {
        console.error("Error al crear producto:", err);
        res.status(500).send(err.message);
    }
};

// Controlador para actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id_producto, ...product } = req.body;

    try {
        const result = await productModel.updateProduct(id_producto, product);
        if (result.rowsAffected === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.status(200).send('Producto actualizado con éxito');
        }
    } catch (err) {
        console.error('Error al actualizar producto:', err);
        res.status(500).send(err.message);
    }
};
