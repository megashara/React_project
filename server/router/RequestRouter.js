const express = require("express");
const router = express.Router();
const Request = require("../entity/Request.js");
const RequestService = require("../service/RequestService.js");
const url = require("url");
var session = require('express-session')

router.get("/", function (req, res) {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  if (query.onlyOpen) {
    new RequestService().getOpenRequest().then(function (result) {
      if (!!result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Something wrong! Write site administrator!");
      }
    });
  } else {
    new RequestService().getAllRequests().then(function (result) {
      res.status(200).send(result);
    });
  }
});

router.get("/:id", function (req, res) {
  new RequestService().getRequest(req.params.id).then(function (result) {
    if (!!result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Request doesn't exist.");
    }
  });
});

router.post("/", function (req, res) {
  const request = new Request(req.body.userId, req.body.carElementMap);
  new RequestService().addRequest(request).then(function (result) {
    res.status(201).send(result);
  });
});

router.delete("/:id", function (req, res) {
  console.log("delete method");
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  console.log("params router: " + req.params.id + "   " + query.closeReason);
  new RequestService()
    .closeRequest(req.params.id, query.closeReason)
    .then(function (result) {
      console.log("result router: " + result);
      if (!!result) {
        res.status(204).send(result);
      } else {
        res.status(204).send("Request is already closed.");
      }
    });
});

// router.post('/', function (req, res) {
//     new RequestService().addRequest();
//     res.status(201).send('create item!');
// });

module.exports = { router };
