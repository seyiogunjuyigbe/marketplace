"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteService = exports.updateService = exports.editService = exports.seeMyServices = exports.createService = exports.renderServicePage = void 0;

var Service = require("../models/service");

var User = require("../models/user");

var renderServicePage = function renderServicePage(req, res) {
  User.findById(req.user.id, function (err, user) {
    if (err) {
      return res.status(404).send("User not found");
    } else {
      return res.status(201).render("createService", {
        user: user
      });
    }
  });
};

exports.renderServicePage = renderServicePage;

var createService = function createService(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(404).send("User not found!");
    } else {
      Service.create(req.body.service, function (err, service) {
        if (err) {
          return res.status(500).send("internal Server Error");
        } else {
          service.createdAt = Date.now();
          service.createdBy = user._id;
          service.save();
          user.services.push(service);
          user.save();
          return res.status(200).send(service);
        }
      });
    }
  });
};

exports.createService = createService;

var seeMyServices = function seeMyServices(req, res) {
  User.findById(req.user._id).populate("services").exec(function (err, user) {
    if (err) {
      return res.status(404).send("User not found");
    } else {
      return res.status(200).render("myServices", {
        user: user
      });
    }
  });
};

exports.seeMyServices = seeMyServices;

var editService = function editService(req, res) {
  Service.findById(req.params.service_id, function (err, service) {
    if (err) {
      return res.status(404).send("Service not found");
    }

    if (service.createdBy == req.user._id) {
      return res.status(200).render("editService", {
        service: service
      });
    } else {
      console.log("".concat(service.createdBy, " is not equal to ").concat(req.user._id));
      return res.status(401).send("You are not permitted to do that!");
    }
  });
};

exports.editService = editService;

var updateService = function updateService(req, res) {
  Service.findByIdAndUpdate(req.params.service_id, req.body.service, function (err, service) {
    if (err) {
      return res.status(500).send("Internal Service Error");
    } else {
      return res.satus(200).render("myServices", {
        service: service
      });
    }
  });
};

exports.updateService = updateService;

var deleteService = function deleteService(req, res) {
  Service.findByIdAndDelete(req.params.service_id, function (err, service) {
    if (err) {
      return res.status(404).send("Service not found");
    } else if (req.user._id !== service.createdBy) {
      return res.status(401).send("You are not permitted to do that!");
    } else {
      console.log("Service deleted");
      return res.status(200).render("dashboard", {
        user: req.user
      });
    }
  });
};

exports.deleteService = deleteService;