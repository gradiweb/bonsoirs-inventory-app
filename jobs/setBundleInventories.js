const { ProductService } = require("../services/products/product.service");

const productServiceInstance = new ProductService();

/*
- Fetch all bundle products from Shopify, including variant info
For each bundle:
    - Extract subproduct handles from tags
    - Extract product info of subproducts, including variant info
    For each bundle variant
        - Extract option values
        - Match option values to subproduct variants
        - Aggregate matched variants' inventories
        - Set variant inventory to result if > 0
*/

productServiceInstance
    .fetchProductsByTag("package")
    .then(response => {
        const products = response.products.edges && response.products.edges.map(el => el.node);
        if (!products) return;

        for (const prod of products) {
            const { tags } = prod;
            const handles = tags
                .filter(el => el.match(/^product-/))
                .map(el => el.split("product-")[1]);

            console.log(handles);
        }
    })
    .catch(err => console.error(err));

function endJob(msg) {
    console.log(`Job ended. Message: ${msg}`);
    break
}