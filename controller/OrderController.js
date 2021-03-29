const ControllerUtil = require('../util/ControllerUtil');
const OrderService = require('../services/OrderService');

module.exports = class OrderController {
  /**
   *
   * @api {GET} api/orders
   * @description Get all orders
   */
  static async listOrders(request, response) {
    try {
      return response.json(await OrderService.listOrders());
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }

  /**
   *
   * @api {GET} api/orders/:id
   * @description Get orders by id
   */
  static async orderSummary(request, response) {
    try {
      return response.json(await OrderService.orderSummary(request.params.id));
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }

  /**
   *
   * @api {POST} api/orders
   * @description Get order summary
   */
  static async createOrder(request, response) {
    try {
      
      return response.json(await OrderService.createOrder(request.body));
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }
  /**
   *
   * @api {POST} api/orders
   * @description place an order
   */
  static async placeOrder(request, response) {
    try {
      return response.json(await OrderService.placeOrder(request.params.id));
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }
};
