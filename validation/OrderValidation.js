const Joi = require('joi');
const DevToolkit = require('../util/DevToolkit');
module.exports = class OrderValidation {
  static validateOrderId(orderId) {
    let errors = {};
    // Validate orderId
    if (DevToolkit.isEmpty(orderId)) {
      errors.orderId = 'orderId query parameter is required';
    }

    return {
      errors,
      isValid: Object.keys(errors).length == 0
    };
  }
  static validateOrderData(payload) {
    let errors = {};

    const orderItemSchema = {
      productId: Joi.string().required(),
      quantity: Joi.number()
    };

    const customerSchema = {
      name: Joi.string().required(),
      email: Joi.string().required()
    };

    const orderSchema = Joi.object().keys({
      orderItems: Joi.array().min(1).items(Joi.object(orderItemSchema)).required(),
      customer: Joi.object(customerSchema).required()
    });

    const { error: validationError } = orderSchema.validate(payload);

    if (validationError) {
      const errorList = validationError.details;
      for (const localError of errorList) {
        errors[localError.context.key] = `${localError.message.replace(/"(.+)"/g, '$1')}`;
      }
    }

    return {
      errors,
      isValid: Object.keys(errors).length == 0
    };
  }
};
