module.exports.createError = (errorCode, message) => { throw ({ errorCode: errorCode, message: message }) }