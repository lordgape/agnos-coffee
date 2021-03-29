const router = require('express').Router();
const OrderController = require('../../controller/OrderController');

/**
 * @route api/orders
 * @desc Get all orders
 * @access Public
 */
router.get('/', (req, res) => {
  OrderController.listOrders(req, res);
});

/**
 * @route api/orders/:id
 * @desc Get all orders
 * @access Public
 */
router.get('/:id', (req, res) => {
  OrderController.orderSummary(req, res);
});

/**
 * @route api/orders/:id
 * @desc Place an order
 * @access Public
 */
router.post('/:id', (req, res) => {
  OrderController.placeOrder(req, res);
});

/**
 * @route api/orders
 * @desc Place an order
 * @access Public
 */
router.post('/', (req, res) => {
  OrderController.createOrder(req, res);
});


module.exports = router;
