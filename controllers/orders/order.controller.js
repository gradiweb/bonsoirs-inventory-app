// Package (All npm package)
require('dotenv').config();

// Requires (Service, Utils, graphql[query, mutations, etc...])
const OrderService = require('../../services/orders/order.service')

// Instances (All class instances)
const orderServiceInstance = new OrderService()




module.exports = class Order {

    shipupOrder = async (req, res) => {


        if (!req.body) return res.sendStatus(200);
        
        try {

            const { id: orderId } = req.body;

            const emailTokenized = await orderServiceInstance.updateOrder(orderId)

            return res.status(200).send(`Added a note with ${emailTokenized}`);
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

}
