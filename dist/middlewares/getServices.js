"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThisService = exports.getAllServices = void 0;

var Service = require("../models/service");

var getAllServices = function getAllServices(req, res) {
  Service.find({}, function (err, allServices) {
    if (err) {
      return res.status(500).send("Internal Server Error");
    } else {
      return res.status(200).render("allServices", {
        services: allServices
      });
    }
  });
};

exports.getAllServices = getAllServices;

var getThisService = function getThisService(req, res) {
  Service.findById(req.params.id, function (err, thisService) {
    if (err) {
      return res.status(404).send("Error... Not found!");
    } else {
      return res.status(200).render("viewService", {
        service: thisService
      });
    }
  });
};

exports.getThisService = getThisService;