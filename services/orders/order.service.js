require("dotenv").config();

const {
    beginOrderEdit,
    addVariantToOrder,
    addFullDiscountToVariant,
    endOrderEdit
} = require("../../graphql/orders/mutations/order.mutation");

const graphQLClient = require("../../graphql");

const { SHOPIFY_GQL_ENDPOINT: gql_url, SHOPIFY_GQL_BASEID: gql_baseId } = process.env;

class OrderService {
    constructor() {
        this.baseUrl = gql_url;
        this.baseGQLId = gql_baseId;
    }

    async beginOrderEdit(orderId) {
        const response = await graphQLClient.request(beginOrderEdit, {
            id: `${this.baseGQLId}/Order/${orderId}`
        });

        return response;
    }

    async addVariantOrderEdit(orderEditId, variantId, quantity) {
        const response = await graphQLClient.request(addVariantToOrder, {
            orderEditId: `${this.gql_baseId}/CalculatedOrder/${orderEditId}`,
            variantId: `${this.gql_baseId}/ProductVariant/${variantId}`,
            quantity
        });

        return response;
    }

    async addFullDiscountOrderEditLineItem(orderEditId, lineItemId) {
        const response = await graphQLClient.request(addFullDiscountToVariant, {
            orderEditId: `${this.gql_baseId}/CalculatedOrder/${orderEditId}`,
            lineItemId: `${this.gql_baseId}/CalculatedLineItem/${lineItemId}`
        });

        return response;
    }

    async endOrderEdit(orderEditId) {
        const response = await graphQLClient.request(endOrderEdit, {
            orderEditId: `${this.gql_baseId}/CalculatedOrder/${orderEditId}`
        });

        return response;
    }
}

module.exports = { OrderService };
