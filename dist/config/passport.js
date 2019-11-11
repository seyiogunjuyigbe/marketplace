"use strict";

var _constants = require("./constants");

var _user = require("../models/user");

var passport = require("passport");

var LocalStrategy = require('passport-local');

var passportLocalMongoose = require('passport-local-mongoose');

module.exports = function () {
  passport.use("local", new LocalStrategy(_user.User.authenticate()));
  passport.serializeUser(_user.User.serializeUser());
  passport.deserializeUser(_user.User.deserializeUser());
};