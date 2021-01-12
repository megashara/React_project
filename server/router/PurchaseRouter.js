const express = require("express");
const router = express.Router();
const Purchase = require("../entity/Purchase.js");
const PurchaseService = require("../service/PurchaseService.js");
const url = require("url");

router.post("/", function (req, res) {
  const purchase = new Purchase(req.body.requestId, req.body.bidMap);
  new PurchaseService().addPurchase(purchase).then(function (result) {
    res.status(201).send(result);
  });
});

router.get("/", function (req, res) {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  new PurchaseService()
    .getPurchaseByRequestId(query.requestId)
    .then(function (result) {
      if (!!result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Purchase doesn't exist.");
      }
    });
});

router.get("/:id", function (req, res) {
  new PurchaseService().getPurchase(req.params.id).then(function (result) {
    if (!!result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Purchase doesn't exist.");
    }
  });
});

module.exports = { router };
