"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myProfile = void 0;

var _userAuth = _interopRequireDefault(require("./userAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = require("../models/user");

var passport = require("passport");

var myProfile = function myProfile(req, res, next) {
  if (req.user == undefined) {
    return res.redirect("/user/login");
  } else {
    User.findById(req.user._id, function (err, user) {
      return res.status(200).render("dashboard", {
        user: user
      });
    });
  }
};

exports.myProfile = myProfile;