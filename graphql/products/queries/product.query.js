const { gql } = require("graphql-request");

const getProductById = gql`
    query product($id: ID!) {
        product(id: $id) {
            id
            handle
            title
            description
            tags
        }
    }
`;

const getProductByHandle = gql`
    query productByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            id
            handle
            title
            description
            tags
        }
    }
`;

module.exports = { getProductById, getProductByHandle };
