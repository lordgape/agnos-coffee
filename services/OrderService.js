const Orders = require('../db/models/Orders');
const Products = require('../db/models/Products');
const AppResponse = require('../models/AppResponse');
const ResponseCode = require('../models/ResponseCode');
const AppError = require('../models/AppError');
const ErrorUtil = require('../util/ErrorUtil');
const OrderValidation = require('../validation/OrderValidation');
const CastError = require('mongoose').CastError;
const OrderLibrary = require("../library/OrderLibrary");
const { ORDER_STATUS, DISCOUNT_TYPE } = require('../util/constants');
const socket = require('../index');

const computeDiscount = (discount, total) => {
  let value = 0;

  if (discount && discount.value && discount.type == DISCOUNT_TYPE.PERCENTAGE) {
    value = (discount.value / 100) * total;
  }

  if (discount && discount.value && discount.type == DISCOUNT_TYPE.Fixed) {
    value = discount.value;
  }

  return value;
};
module.exports = class ProductService {
  /**
   *
   * @param payload User's payload for placing order
   * @description Get Order summary
   * @access Public
   **/
  static async createOrder(payload) {
    try {
      let { errors, isValid } = OrderValidation.validateOrderData(payload);

      if (!isValid) {
        throw ErrorUtil.generateValidationError(errors);
      }

      const { orderItems, customer } = payload;

      let orderItemsPromise = orderItems.map(async (item) => {
        const product = await Products.findById(item.productId);
        const tax = product.tax ? (product.tax / 100) * product.basePrice : 0;
        let discount = computeDiscount(product.discount, product.basePrice);
        // Only apply discount if purchase is made with other item
        discount = orderItems.length > 1 ? discount : 0;
        const price = product.basePrice + tax - discount;

        return {
          productId: item.productId,
          quantity: item.quantity || 1,
          discount,
          tax,
          price: product.basePrice,
          finalPrice: price
        };
      });

      let transformedOrderItems = await Promise.all(orderItemsPromise);

      // Calculate quantity, subtotal,discount,tax of order

      const summary = transformedOrderItems.reduce(
        (acc, currentValue) => {
          acc.quantity += currentValue.quantity || 0;
          acc.subtotal += currentValue.finalPrice || 0;
          acc.discount += currentValue.discount || 0;
          acc.tax += currentValue.tax || 0;

          return acc;
        },
        { quantity: 0, subtotal: 0, discount: 0, tax: 0 }
      );

      summary.total = (summary.subtotal || 0) + (summary.tax || 0) - (summary.discount || 0);

      const newOrder = new Orders({
        customer: customer,
        orderItems: transformedOrderItems,
        summary,
        orderStatus: {
          current: ORDER_STATUS.INVOICE_ISSUED
        }
      });

      const savedOrder = await newOrder.save();

      return new AppResponse(ResponseCode.SUCCESS, { order: savedOrder }, []);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw ErrorUtil.generateUnknownError(`orderSummary`, error);
      }
    }
  }

  /**
   *
   * @description Get all order's on the system
   */
  static async listOrders() {
    try {
      let allOrder = await Orders.find().select('-__v').sort({ date: -1 });

      return new AppResponse(ResponseCode.SUCCESS, { orders: allOrder }, []);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw ErrorUtil.generateUnknownError(`listOrders`, error);
      }
    }
  }

  /**
   *
   * @description Get all order's on the system
   * @param orderId Order's id
   */
  static async orderSummary(orderId) {
    try {
      let { errors, isValid } = OrderValidation.validateOrderId(orderId);

      if (!isValid) {
        throw ErrorUtil.generateValidationError(errors);
      }

      let order = await Orders.findById(orderId).select('-__v').sort({ date: -1 });

      if (!order) {
        throw ErrorUtil.getOrderNotFoundError(orderId);
      }

      return new AppResponse(ResponseCode.SUCCESS, { order: order }, []);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else if (error instanceof CastError) {
        throw ErrorUtil.getOrderNotFoundError(orderId);
      } else {
        throw ErrorUtil.generateUnknownError(`placeOrder`, error);
      }
    }
  }

  /**
   *
   * @description Place order
   * @param orderId order's id
   */
  static async placeOrder(orderId) {
    try {
      let { errors, isValid } = OrderValidation.validateOrderId(orderId);

      if (!isValid) {
        throw ErrorUtil.generateValidationError(errors);
      }

      let order = await Orders.findById(orderId);

      if (!order) {
        throw ErrorUtil.getOrderNotFoundError(orderId);
      }

      if (
        order.orderStatus.current === ORDER_STATUS.READY_FOR_SHIPPING ||
        order.orderStatus.current === ORDER_STATUS.IN_PRODUCTION
      ) {
        throw ErrorUtil.orderAlreadyTreated(order.id, order.orderStatus.current);
      }

      order.orderStatus = {
        current: ORDER_STATUS.READY_FOR_SHIPPING
      };

      order.save();

      socket.ioObject.emit('order_ready', { message: 'You order is ready for shipping' });

      return new AppResponse(
        ResponseCode.SUCCESS,
        {
          msg: `Your order has been place. We will notify you when its ready for shipping`
        },
        []
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else if (error instanceof CastError) {
        throw ErrorUtil.getOrderNotFoundError(orderId);
      } else {
        throw ErrorUtil.generateUnknownError(`placeOrder`, error);
      }
    }
  }
};
