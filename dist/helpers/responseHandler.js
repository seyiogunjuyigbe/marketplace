"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respondWithWarning = void 0;

/** Sends an error to the frontend upon failure of a request.
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} error
  */
var respondWithWarning = function respondWithWarning(res, statusCode, error) {
  res.status(statusCode).json({
    success: false,
    error: error
  });
};

exports.respondWithWarning = respondWithWarning;