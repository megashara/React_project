const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const props = {
  port: 8000,
  userRouter: require("./router/UserRouter.js"),
  requestRouter: require("./router/RequestRouter.js"),
  carElementRouter: require("./router/CarElementRouter.js"),
  bidRouter: require("./router/BidRouter.js"),
  purchaseRouter: require("./router/PurchaseRouter.js"),
  balanceRouter: require("./router/BalanceRouter.js"),
};

app.listen(props.port, function () {
  console.log("app running on port " + props.port);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
  next();
});

app.use(bodyParser.json());

app.use("/user", props.userRouter.router);
app.use("/request", props.requestRouter.router);
app.use("/car_element", props.carElementRouter.router);
app.use("/bid", props.bidRouter.router);
app.use("/purchase", props.purchaseRouter.router);
app.use("/balance", props.balanceRouter.router);
