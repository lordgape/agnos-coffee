module.exports = class AppResponse extends Error {

  /**
   * 
   * @param {ResponseCode} responseCode 
   * @param {Object} response 
   * @param {Object []} error 
   */

  constructor(responseCode, response, error) {
    super();
    this.responseCode = responseCode;
    this.response = response;
    this.error = error
  }
}