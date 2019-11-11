"use strict";

var _constants = require("../config/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);

    this._connect();
  }

  _createClass(Database, [{
    key: "_connect",
    value: function _connect() {
      mongoose.connect(_constants.DB_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      }).then(function () {
        console.log('Database connected to: ' + _constants.DB_URL);
      })["catch"](function (err) {
        console.error(err);
      });
    }
  }]);

  return Database;
}();

module.exports = new Database();