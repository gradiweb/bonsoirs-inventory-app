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
            variants(first: 50) {
                edges {
                    node {
                        id
                        title
                        sku
                        inventoryItem {
                            id
                            inventoryLevels(first: 5) {
                                edges {
                                    node {
                                        id
                                        location {
                                            id
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const getVariantBySKU = gql`
    query productVariants($sku: String!) {
        productVariants(first: 5, query: $sku) {
            edges {
                node {
                    id
                    sku
                    title
                    inventoryItem {
                        id
                        inventoryLevels {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

getProductsByTag = gql`
    query productsByTag($query: String!) {
        products(first: 10, query: $query) {
            edges {
                node {
                    id
                    handle
                    tags
                    options {
                        name
                    }
                    variants(first: 90) {
                        edges {
                            node {
                                id
                                title
                            }
                        }
                    }
                }
            }
        }
    }
`;

module.exports = { getProductById, getProductByHandle, getVariantBySKU, getProductsByTag };
