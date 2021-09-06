const graphQLClient = require("../../graphql");
const { getProductById } = require("../../graphql/products/queries/product.query");

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
        const response = await graphQLClient.request(getProductById, {
            id: `gid://shopify/Product/${productId}`
        });
        return response;
    }

    async getBundleSubProducts(line_items) {
        const data = [];

        for (const item of line_items) {
            const { product_id, quantity } = item;
            try {
                const response = await this.getProduct(product_id);
                const { product } = response;

                if (!product.tags.includes("package")) continue;

                // If the product is a bundle, get inner products' handles from tags
                const innerProducts = product.tags
                    .filter(tag => tag.match(/^product-/))
                    .map(el => el.split("product-")[1]);

                if (innerProducts.length === 0) continue;

                innerProducts.forEach(el => data.push({ handle: el, quantity }));
            } catch (err) {
                console.error(err);

                return null;
            }
        }

        return data;
    }
}

module.exports = { ProductService };
