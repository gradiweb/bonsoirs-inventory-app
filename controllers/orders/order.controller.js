// Package (All npm package)
require("dotenv").config();

// Requires (Service, Utils, graphql[query, mutations, etc...])
const { OrderService } = require("../../services/orders/order.service");

// Instances (All class instances)
const orderServiceInstance = new OrderService();

module.exports = class Order {
    async shipupOrder(req, res) {
        if (!req.body) return res.sendStatus(200);

        const { id: orderId } = req.body;

        const emailTokenized = `c8585${orderId}@shipup.io`;

        let data = {
            order: {
                id: orderId,
                note: emailTokenized
            }
        };

        try {
            const serverResponse = await orderServiceInstance.updateOrder(orderId, data);

            return res.status(200).json({
                response: `Added a note with ${emailTokenized}`,
                serverResponse
            });
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async handleNewOrder(req, res) {
        if (!req.body) return res.sendStatus(200);

        const { id: orderId } = req.body;

        console.log(`Received webhook for the creation of order #${orderId}`);
        console.log("Payload:");
        console.log(req.body);
    }
};
