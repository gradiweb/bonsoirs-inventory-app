const axios = require('axios')
require('dotenv').config();
const {
    SHOPIFY_API_KEY: key,
    SHOPIFY_API_PWD: pwd,
    SHOPIFY_STORE_DOMAIN: domain,
} = process.env;



class CustomerService {
    
}

class OrderService {
    constructor() {
        this.baseUrl = `https://${key}:${pwd}@${domain}/admin/api/2021-04/orders`;
    }

    updateOrder = async (orderId, data) => {
        const urlOrder = `${this.baseUrl}/${orderId}.json`;

        const response = await axios.put(urlOrder, data);

        return response;
    };
}

module.exports = {CustomerService, OrderService}