"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAYPAL_CLIENT_ID = exports.PAYPAL_SECRET = exports.PAYPAL_MODE = exports.SECRET_KEY = exports.DOMAIN_NAME = exports.DB_URL = exports.PORT = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var _process$env = process.env,
    PORT = _process$env.PORT,
    DB_URL = _process$env.DB_URL,
    DOMAIN_NAME = _process$env.DOMAIN_NAME,
    SECRET_KEY = _process$env.SECRET_KEY,
    PAYPAL_MODE = _process$env.PAYPAL_MODE,
    PAYPAL_SECRET = _process$env.PAYPAL_SECRET,
    PAYPAL_CLIENT_ID = _process$env.PAYPAL_CLIENT_ID;
exports.PAYPAL_CLIENT_ID = PAYPAL_CLIENT_ID;
exports.PAYPAL_SECRET = PAYPAL_SECRET;
exports.PAYPAL_MODE = PAYPAL_MODE;
exports.SECRET_KEY = SECRET_KEY;
exports.DOMAIN_NAME = DOMAIN_NAME;
exports.DB_URL = DB_URL;
exports.PORT = PORT;