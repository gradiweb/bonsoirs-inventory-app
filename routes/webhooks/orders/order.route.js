const router = require('express').Router();

const OrderController = require('../../../controllers/orders/order.controller');

const orderInstance = new OrderController();

router.post('/send-email', orderInstance.shipupOrder);

module.exports = router;
