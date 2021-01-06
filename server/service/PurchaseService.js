const DbConnection = require("../dbConnection/DbConnection.js");
var ObjectId = require("mongodb").ObjectID;

class PurchaseService {
  constructor() {
    this.dbConn = new DbConnection();
    this.type = "purchase";
  }

  async addPurchase(purchase) {
    await this.dbConn
      .addRecord(this.type, purchase)
      .then((result) => {
        purchase = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return purchase;
  }

  async getPurchaseByRequestId(requestId) {
    let purchase;
    const filter = { requestId };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        purchase = result;
        console.log("pur2 " + purchase);
      })
      .catch(function (err) {});
    return purchase;
  }

  async getPurchase(id) {
    const filter = { _id: ObjectId(id) };
    let purchase;
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        purchase = !!result ? result[0] : result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return purchase;
  }
}

module.exports = PurchaseService;
