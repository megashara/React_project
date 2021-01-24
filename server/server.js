const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var session = require('express-session')
var cookieParser = require('cookie-parser');
//redisStorage = require('connect-redis')(session),
//redis = require('redis'),
//client = redis.createClient()
const host = '127.0.0.1'

const corsOptions = {
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

app.use(cookieParser());

// app.use(session({
//   store: new redisStorage({
//     host: host,
//     port: 6379,
//     client: client,
//   }),
//   secret: "userName",
//   saveUninitialized: false,
//   resave: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//   },
// }))



app.use(bodyParser.json());


app.use("/user", props.userRouter.router);
app.use("/request", props.requestRouter.router);
app.use("/car_element", props.carElementRouter.router);
app.use("/bid", props.bidRouter.router);
app.use("/purchase", props.purchaseRouter.router);
app.use("/balance", props.balanceRouter.router);
