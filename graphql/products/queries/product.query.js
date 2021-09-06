const { gql } = require("graphql-request");

const getProduct = gql`
    query product($id: ID!) {
        product(id: $id) {
            id
            handle
            title
            description
            tags
            metafields(first: 250) {
                edges {
                    node {
                        namespace
                        key
                    }
                }
            }
        }
    }
`;

module.exports = { getProduct };
