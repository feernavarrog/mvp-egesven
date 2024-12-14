const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/getProducts', productController.getProducts);
router.post('/deleteProduct', productController.deleteProduct);
router.post('/', productController.createProduct);
router.put('/updateProduct', productController.updateProduct);


module.exports = router;
