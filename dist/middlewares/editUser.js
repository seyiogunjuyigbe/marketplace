"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editUser = void 0;

var User = require("../models/user");

var editUser = function editUser(req, res) {
  var params = req.params;
  User.findByIdAndUpdate(params.id, req.body.user, function (err, user) {
    if (err) {
      return res.status(404).send("User not found");
    } else {
      return res.status(200).send("User has been edited");
    }
  });
};

exports.editUser = editUser;