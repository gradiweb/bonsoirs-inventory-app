require('dotenv').config();

const { SHOPIFY_API_PWD: shopifyToken } = process.env;

module.exports = class ShopifyApiUtil{

  getAPIHeaders = () => {
    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyToken,
    };
  
    return headers;
  };
}
