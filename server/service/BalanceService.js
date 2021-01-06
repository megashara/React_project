const DbConnection = require("../dbConnection/DbConnection.js");
var ObjectId = require("mongodb").ObjectID;

class BalanceService {
  constructor() {
    this.dbConn = new DbConnection();
    this.type = "balance";
  }

  async getBalanceUserId(userId) {
    let balance;
    const filter = { userId };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        balance = !!result ? result[0] : result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return balance;
  }

  async changeBalance(operation, id, userId, amount) {
    let balance;
    await this.getBalanceUserId(userId).then(async (result) => {
      if (!result) {
        return null;
      }
      if (operation > 0) {
        balance = +result.balance + +amount;
      } else {
        if (+result.balance == 0 || +result.balance < +amount) {
          return false;
        }
        balance = +result.balance - +amount;
      }

      const condition = { _id: ObjectId(id) },
        newValues = { userId, balance };
      balance = result;
      await this.dbConn
        .updateRecord(this.type, condition, newValues)
        .then((result) => {
          if (!result) {
            balance = null;
            return;
          }
          balance.userId = newValues.userId;
          balance.balance = newValues.balance;
        })
        .catch(function (err) {
          console.warn(err);
          balance = null;
        });
    });
    return balance;
  }
}

module.exports = BalanceService;
