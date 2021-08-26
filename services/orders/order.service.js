const axios = require('axios')
require('dotenv').config();
const {
    SHOPIFY_API_KEY: key,
    SHOPIFY_API_PWD: pwd,
    SHOPIFY_STORE_DOMAIN: domain,
} = process.env;



module.exports = class CustomerService {
    updateOrder = async (orderId) => {
        try {
            const urlOrder = `https://${key}:${pwd}@${domain}/admin/api/2021-04/orders/${orderId}.json`;
            const emailTokenized = `c8585${orderId}@shipup.io`;

            let data = {
                order: {
                    id: orderId,
                    note: emailTokenized,
                },
            };

            await axios.put(urlOrder, data);

            return emailTokenized;

        } catch (err) {
            console.error(err)
            return err
        }
    };
}
