const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const OrderSchema = new Schema({
  orderStatus: {
    updatedAt: {
      type: Date,
      default: Date.now
    },
    current: {
      type: 'string',
      enum: [
        'INVOICE_ISSUED',
        'IN_PRODUCTION',
        'READY_FOR_SHIPPING',
        'SHIPPED',
        'DELIVERED',
        'RETURNED_FOR_EXCHANGE',
        'RECEIVED_FOR_EXCHANGE',
        'RETURNED'
      ],
      description: 'Order status'
    }
  },
  summary: {
    total: {
      type: 'number',
      minimum: 0,
      maximum: 9999999999,
      description: 'Order total amount'
    },
    subtotal: {
      type: 'number',
      minimum: 0,
      maximum: 9999999999,
      description: 'The sum of all items prices'
    },
    discount: {
      type: 'number',
      minimum: 0,
      maximum: 9999999999,
      description: 'Final discount value applied'
    },
    tax: {
      type: 'number',
      minimum: 0,
      maximum: 9999999999,
      description: 'The sum of all the taxes applied to the order'
    },
    quantity: {
      type: 'number',
      minimum: 0,
      maximum: 9999999,
      default: 1,
      description: 'Total order quantity '
    }
  },
  customer: {
    phone: {
      countryCode: {
        type: 'number',
        min: 1,
        max: 999,
        description: 'Country calling code (without +), defined by standards E.123 and E.164'
      },
      national: {
        type: 'string',
        maxLength: 19,
        pattern: '^[0-9]+$',
        description: 'The actual phone number, digits only'
      }
    },
    email: {
      type: 'string',
      maxLength: 200,
      format: 'email',
      required: true,
      description: 'customer email address'
    }
  },
  orderItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: {
        type: 'number',
        minimum: 0,
        maximum: 9999999,
        default: 1,
        description: 'Product quantity '
      },
      price: {
        type: 'number',
        minimum: 0,
        maximum: 999999999,
        description: 'Product sale price specifically for this cart'
      },
      finalPrice: {
        type: 'number',
        minimum: 0,
        maximum: 999999999,
        description: 'Final item price including additions due to customizations and gift wrap'
      },
      discount: {
        type: 'number',
        minimum: 0,
        maximum: 9999999999,
        description: 'discount value applied'
      },
      tax: {
        type: 'number',
        minimum: 0,
        maximum: 9999999999,
        description: 'Taxes applied'
      }
    }
  ]
});

const Orders = Mongoose.model('Orders', OrderSchema);

module.exports = Orders;
