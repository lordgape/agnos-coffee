const Products = require('../db/models/Products');
const AppResponse = require('../models/AppResponse');
const ResponseCode = require('../models/ResponseCode');
const AppError = require('../models/AppError');
const ErrorUtil = require('../util/ErrorUtil');
const ProductValidation = require('../validation/ProductValidation');
const ProductLibrary = require('../library/ProductLibrary');
module.exports = class ProductService {
  /**
   *
   * @param {Object} body user's request
   * @description Create a Products
   * @access Public
   **/
  static async createProduct(name, basePrice, costPrice, discount, tax, quantity) {
    try {
      let { errors, isValid } = ProductValidation.validateProductData(
        name,
        basePrice,
        costPrice,
        discount,
        tax,
        quantity
      );

      if (!isValid) {
        throw ErrorUtil.generateValidationError(errors);
      }

      const newProduct = await ProductLibrary.createNewProduct(name, basePrice, costPrice, tax, quantity, discount);

      return new AppResponse(ResponseCode.SUCCESS, { product: newProduct }, []);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw ErrorUtil.generateUnknownError(`createProduct`, error);
      }
    }
  }

  /**
   *
   * @description Get all product on the system
   */
  static async getAllProducts() {
    try {
      const allProduct = await ProductLibrary.listProductSortedByDate();

      return new AppResponse(ResponseCode.SUCCESS, { products: allProduct }, []);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw ErrorUtil.generateUnknownError(`getAllProducts`, error);
      }
    }
  }
};
