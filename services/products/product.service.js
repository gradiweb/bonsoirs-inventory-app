const graphQLClient = require("../../graphql");
const { getProduct } = require("../../graphql/products/queries/product.query");

require("dotenv").config();

const {
    SHOPIFY_API_KEY: key,
    SHOPIFY_API_PWD: pwd,
    SHOPIFY_STORE_DOMAIN: domain,
    SHOPIFY_GQL_ENDPOINT: gql_url
} = process.env;

class ProductService {
    constructor() {
        this.baseUrl = gql_url;
    }

    async getProduct(productId) {
        const response = await graphQLClient.request(getProduct, {
            id: `gid://shopify/Product/${productId}`
        });
        console.log(response);
        return response;
    }
}

module.exports = { ProductService };
