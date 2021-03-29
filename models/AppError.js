module.exports = class AppErrors {

    constructor(httpStatusCode,errorCode,error){
      this.httpStatusCode = httpStatusCode;
      this.errorCode = errorCode;
      this.error =  error
    }

    
}