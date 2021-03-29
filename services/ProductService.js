const UUID = require('uuid');
const Products = require('../models/Products');
const AppResponse = require('../models/AppResponse');
const ResponseCode = require('../models/ResponseCode');
const AppError = require('../models/AppError');
const ErrorUtil = require('../util/ErrorUtil');
const ProductValidation = require('../validation/ProductValidation');
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

      const newProduct = new Products({
        name: name,
        sku: UUID.v4(),
        basePrice: basePrice,
        costPrice: costPrice,
        tax: tax,
        quantity: quantity || 1
      });

      if (discount) {
        newProduct.discount = discount;
      }

      const savedProduct = await newProduct.save();

      return new AppResponse(ResponseCode.SUCCESS, { product: savedProduct }, []);
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
      const allProduct = await Products.find().select('-__v').sort({ date: -1 });

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
