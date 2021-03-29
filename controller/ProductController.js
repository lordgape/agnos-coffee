const ControllerUtil = require('../util/ControllerUtil');
const ProductService = require('../services/ProductService');

module.exports = class ProductController {
  /**
   *
   * @api {GET} api/products
   * @description Get all products
   */
  static async getAllProducts(request, response) {
    try {
      return response.json(await ProductService.getAllProducts());
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }

  /**
   *
   * @api {POST} api/products
   * @description create a new product
   */
  static async createProduct(request, response) {
    try {
      let { name, basePrice, costPrice, discount, tax, quantity } = request.body;
      return response.json(await ProductService.createProduct(name, basePrice, costPrice, discount,tax, quantity));
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }
};
