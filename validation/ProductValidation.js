const Validator = require('validator');
const DevToolkit = require('../util/DevToolkit');
const {DISCOUNT_TYPE} = require('../util/constants')

module.exports = class ProductValidation {
  static validateProductData(name, basePrice, costPrice, discount, tax, quantity) {
    let errors = {};

    // Validate name
    if (DevToolkit.isEmpty(name)) {
      errors.name = 'name parameter is required';
    }
    
    // Validate basePrice
    if (DevToolkit.isEmpty(basePrice)) {
      errors.basePrice = 'basePrice parameter is required';
    }
    
    if(!Validator.isNumeric(basePrice.toString() || "0")) {
      errors.basePrice = 'basePrice must be a valid digit';
    }
    
    // Validate costPrice
    if (DevToolkit.isEmpty(costPrice)) {
      errors.costPrice = 'costPrice parameter is required';
    }

    if(!DevToolkit.isEmpty(costPrice) && !Validator.isNumeric(costPrice.toString() || "0")) {
      errors.costPrice = 'costPrice must be a valid digit';
    }
   
    // Validate tax
    if(!DevToolkit.isEmpty(tax) && !Validator.isNumeric(tax.toString()  || "0")) {
      errors.tax = 'tax must be a valid digit';
    }
    
    // Validate quantity
    if(!DevToolkit.isEmpty(quantity) && !Validator.isNumeric(quantity.toString() || "0")) {
      errors.quantity = 'quantity must be a valid digit';
    }
    
    
    // Validate discount
    if (!DevToolkit.isEmpty(discount)) {
  
      if (DevToolkit.isEmpty(discount.label)) {
        errors.discount = {};
        errors.discount.label = 'label parameter of discount object is required';
      }
      
      if (DevToolkit.isEmpty(discount.type)) {
        errors.discount = (errors.discount) ? errors.discount : {};
        errors.discount.type = 'type parameter of discount object is required';
      }
      
      if (!DevToolkit.isEmpty(discount.type) && !DISCOUNT_TYPE[discount.type]) {
        errors.discount = (errors.discount) ? errors.discount : {};
        errors.discount.type = `Valid type parameter of discount object are ${Object.keys(DISCOUNT_TYPE).join(", ")}`;
      }
      
      if (DevToolkit.isEmpty(discount.value)) {
        errors.discount = (errors.discount) ? errors.discount : {};
        errors.discount.value = 'value parameter of discount object is required';
      }
      
      if (!Validator.isNumeric(discount.value.toString() || "0")) {
        errors.discount = (errors.discount) ? errors.discount : {};
        errors.discount.value = 'value parameter of discount object must be a valid digit';
      }
    }    
    

    return {
      errors,
      isValid: Object.keys(errors).length == 0,
    };
  }
};
