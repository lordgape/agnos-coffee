const AppError = require("../models/AppError");
const AppResponse = require("../models/AppResponse");
const ResponseCode = require("../models/ResponseCode");

module.exports = class ControllerUtil {

  /**
   * 
   * @param {AppError | Object} error 
   * @param {Object} response 
   */
  static sendErrorResponse(error, response) {
    
    if (error instanceof AppError) {
       response.status(error.httpStatusCode).json(new AppResponse(error.errorCode, null, error.error));
    }
    else {

       console.log(`Demestify unknown error - ${error.message || ''} - ${JSON.stringify(error)}`);

       response.status(500).json(new AppResponse(500, ResponseCode.UNKNOWN_ERROR, "Unknown error occured, please check the server"));
    }
  }

}
