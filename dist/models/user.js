"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LocalStrategy = require('passport-local');

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  avatarUrl: String,
  email: String,
  isSeller: Boolean,
  isBuyer: Boolean,
  messages: [],
  favourites: [],
  purchases: [],
  seller_profile: {
    skills: [{
      name: String,
      level: String
    }],
    languages: [{
      name: String,
      level: String
    }],
    description: {
      title: String,
      description: String,
      rate: Number
    }
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  }]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);