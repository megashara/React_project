const DbConnection = require("../dbConnection/DbConnection.js");
const ObjectId = require("mongodb").ObjectID;
const UserService = require("./UserService");
const CarElementService = require("./CarElementService");

class BidService {
  constructor() {
    this.dbConn = new DbConnection();
    this.type = "bid";
  }

  async addBid(bid) {
    await this.dbConn
      .addRecord(this.type, bid)
      .then((result) => {
        bid = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return bid;
  }

  async populate(records) {
    let userService = new UserService();
    let carElemService = new CarElementService();
    for (let item of records) {
      await userService.getUserById(item.userId).then(result => {
        item.user = result;
      });
      await carElemService.getCarElementById(item.carElementId).then(result => {
        item.carElement = result;
      });
    }
    return records;
  }

  async getBidsByUserId(userId) {
    let bids;
    const filter = { userId };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        bids = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return bids;
  }

  async getBidsByRequestId(requestId) {
    let bids;
    const filter = { requestId };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        bids = this.populate(result);
        console.log(bids)
      })
      .catch(function (err) {
        console.warn(err);
      });
    return bids;
  }

  async getBid(id) {
    const filter = { _id: ObjectId(id) };
    let bid;
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        bid = !!result ? result[0] : result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return bid;
  }

  async deleteBid(id) {
    let isDeleted = false;
    await this.getBid(id)
      .then(async (result) => {
        if (!result) {
          return null;
        }
        console.log("Res " + JSON.stringify(result));
        await this.dbConn
          .deleteRecord(this.type, id)
          .then(function (result) {
            isDeleted = result;
          })
          .catch(function (err) {
            console.warn(err);
          });
      })
      .catch(function (err) {
        console.warn(err);
      });
    return isDeleted;
  }
}

module.exports = BidService;
