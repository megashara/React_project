const express = require("express");
const router = express.Router();
const Balance = require("../entity/Balance.js");
const BalanceService = require("../service/BalanceService.js");
const url = require("url");

router.get("/", function (req, res) {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  new BalanceService().getBalanceUserId(query.userId).then(function (result) {
    if (!!result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Balance for current user doesn't exist.");
    }
  });
});

router.patch("/", function (req, res) {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  new BalanceService()
    .changeBalance(query.operation, query.id, query.userId, query.amount)
    .then(function (result) {
      if (!!result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("User doesn't exist.");
      }
    });
});

module.exports = { router };
