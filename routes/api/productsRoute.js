const router = require('express').Router();
const ProductController = require('../../controller/ProductController');

/**
 * @route api/products
 * @desc Get all products 
 * @access Public
 */
router.get('/', (req, res) => {
  ProductController.getAllProducts(req, res);
});

/**
 * @route api/products
 * @desc Create a product
 * @access Public
 */
router.post('/', (req, res) => {
  ProductController.createProduct(req, res);
});


module.exports = router;
