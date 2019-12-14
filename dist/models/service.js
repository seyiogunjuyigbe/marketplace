"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var serviceSchema = new Schema({
  createdBy: String,
  createdAt: Date,
  title: String,
  description: String,
  category: String,
  subCategory: String,
  tags: [],
  decription: String,
  faqs: [{
    question: String,
    answer: String
  }],
  isPrivate: Boolean,
  price: Number,
  currency: {
    type: String,
    "default": "USD"
  },
  deliveryTime: Number,
  revisionCount: String,
  extras: [{
    title: String,
    description: String,
    cost: Number
  }],
  requirements: [{
    description: String,
    type: String,
    isMandatory: Boolean
  }],
  thumbnails: [{
    src: String,
    type: String
  }],
  videos: [{
    src: String,
    type: String
  }],
  status: String
});
module.exports = mongoose.model("Service", serviceSchema);