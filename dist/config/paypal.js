"use strict";

var _constants = require("./constants");

paypal.configure({
  'mode': _constants.PAYPAL_MODE,
  'client_id': _constants.PAYPAL_CLIENT_ID,
  'client_secret': _constants.PAYPAL_SECRET
});