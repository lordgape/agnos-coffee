const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: 'string',
    maxLength: 255,
    required: true,
    description: 'Product full name'
  },
  sku: {
    type: 'string',
    minLength: 2,
    maxLength: 100,
    pattern: '^[A-Za-z0-9-_.]+$',
    uniqueItems: true,
    required: true,
    description: 'Product unique reference code'
  },
  subtitle: {
    type: 'string',
    maxLength: 255,
    description: 'Optional subtitle intended to be used for SEO or layout purposes'
  },
  price: {
    type: 'number',
    minimum: 0,
    maximum: 999999999,
    description: 'Product sale price, when undefined, product could be bought by any price'
  },
  basePrice: {
    type: 'number',
    minimum: 0,
    maximum: 999999999,
    required: true,
    description: 'Product original sale price, without discounts'
  },
  costPrice: {
    type: 'number',
    minimum: 0,
    maximum: 999999999,
    required: true,
    description: 'Product cost price to calculate profit'
  },
  currency: {
    type: 'string',
    pattern: '^[A-Z]{3}$',
    default: 'USD',
    description: 'Designator of currency according to ISO 4217 (3 uppercase letters)'
  },
  quantity: {
    type: 'number',
    minimum: 0,
    maximum: 9999999,
    default: 1,
    description: 'Product quantity available to sell, max to put in cart'
  },
  tax: {
    type: 'number',
    minimum: 0,
    maximum: 9999999,
    description: 'Tax applied'
  },
  discount: {
    label: {
      type: 'string',
      maxLength: 50,
      description: 'Name of payment method or other label describing applicable discount'
    },
    type: {
      type: 'string',
      enum: ['PERCENTAGE', 'FIXED'],
      description: 'Discount type'
    },
    value: {
      type: 'number',
      minimum: -99999999,
      maximum: 99999999,
      description: 'Discount value, percentage or fixed'
    }
  }
});

const Products = Mongoose.model('Products', ProductSchema);

module.exports = Products;
