// Package (All npm package)
require("dotenv").config();

// Requires (Service, Utils, graphql[query, mutations, etc...])
const { OrderService } = require("../../services/orders/order.service");
const { ProductService } = require("../../services/products/product.service");

// Instances (All class instances)
const orderServiceInstance = new OrderService();
const productServiceInstance = new ProductService();

class Order {
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

        const { id: orderId, line_items } = req.body;

        // console.log(JSON.stringify(req.body, 0, 2));

        console.log(`Received webhook for the creation of order #${orderId}`);

        // * 1. Extract line items that are bundle products
        // ? Should this be a service-object's method?

        for (const item of line_items) {
            const { product_id } = item;
            try {
                const response = await productServiceInstance.getProduct(product_id);
                const { product } = response;

                if (!product) return res.sendStatus(404);

                console.log(JSON.stringify(product, 0, 2));
            } catch (err) {
                console.error(err);
                return res.sendStatus(500);
            }
        }

        return res.sendStatus(200);
    }
}

module.exports = Order;
