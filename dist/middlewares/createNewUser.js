"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = void 0;

var User = require("../models/user");

var newUser = function newUser(req, res) {
  User.create(req.body.user, function (err, user) {
    if (err) {
      return res.status(500).send("internal Server Error");
    } else {
      return res.status(200).send(user);
    }
  });
};

exports.newUser = newUser;