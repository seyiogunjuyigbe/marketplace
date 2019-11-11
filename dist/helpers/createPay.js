"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPay = void 0;

var paypal = require("paypal-rest-sdk");

var createPay = function createPay(payment) {
  return new Promise(function (resolve, reject) {
    paypal.payment.create(payment, function (err, payment) {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};

exports.createPay = createPay;