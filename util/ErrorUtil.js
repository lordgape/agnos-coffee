const AppError = require('../models/AppError');
const ResponseCode = require('../models/ResponseCode');

module.exports = class ErrorUtil {
  static orderAlreadyTreated(id, status) {
    return new AppError(400, ResponseCode.FAILED, {
      code: ResponseCode.ORDER_ALREADY_TREATED,
      msg: `${id} - ${ResponseCode.ORDER_ALREADY_TREATED_MSG} - Current status is ${status}`
    });
  }
  static generateValidationError(errors) {
    errors.code = ResponseCode.VALIDATION_ERROR;
    (errors.msg = ResponseCode.VALIDATION_ERROR_MSG),
      console.log(`FAILED - Validation error occured ${JSON.stringify(errors)}`);

    return new AppError(400, ResponseCode.FAILED, errors);
  }

  static getOrderNotFoundError(id, err = {}) {
    console.log(`Order not found - ${JSON.stringify(err)}`);

    return new AppError(404, ResponseCode.NOT_FOUND, {
      code: ResponseCode.ORDER_NOT_FOUND,
      msg: `${id} ${ResponseCode.ORDER_NOT_FOUND_MSG}`
    });
  }

  static generateUnknownError(methodName,error)
  {    
    console.log(`UNKNOWN error at ${methodName} - ${error.message || ''} - ${JSON.stringify(error)}`);
    
    return new AppError(500,ResponseCode.UNKNOWN_ERROR,`Unknown error occurred at server - ${error.message || ''}`);
  }
};
