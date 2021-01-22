const DbConnection = require("../dbConnection/DbConnection.js");
const ObjectId = require("mongodb").ObjectID;
const UserService = require("./UserService");
const CarElementService = require("./CarElementService");

class RequestService {
  constructor() {
    this.dbConn = new DbConnection();
    this.type = "request";
  }

  async addRequest(request) {
    await this.dbConn
      .addRecord(this.type, request)
      .then((result) => {
        request = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return request;
  }

  async getRequest(id) {
    const filter = { _id: ObjectId(id) };
    let requests;
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        requests = this.populate(result);
      })
      .catch(function (err) {
        console.warn(err);
      });
    return requests;
  }

  async closeRequest(id, closeReason) {
    let request;
    await this.getRequest(id).then(async result => {
      if (!result) {
        return null;
      }
      request = result;
      if (request.isClosed) {
        return null;
      }

      const condition = { _id: ObjectId(id) },
        newValues = { closeReason, isClosed: true };
      await this.dbConn
        .updateRecord(this.type, condition, newValues)
        .then((result) => {
          console.log("SERVER" + result);
          if (!result) {
            request = null;
            return;
          }
          request.closeReason = newValues.closeReason;
          request.isClosed = newValues.isClosed;
        })
        .catch(function (err) {
          console.warn(err);
          request = null;
        });
    });
    return request;
  }

  async getAllRequests() {
    let records;
    await this.dbConn
      .getAllRecords(this.type)
      .then(result => {
        records = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return records;
  }

  async populate(records) {
    let userService = new UserService();
    let carElemService = new CarElementService();
    for (let item of records) {
      await userService.getUserById(item.userId).then(result => {
        item.user = result;
      });
      for(let mapEl of item.carElementMap) {
        await carElemService.getCarElementById(mapEl.carElementId).then(result => {
          mapEl.carElement = result;
        });
      }
    }
    return records;
  }

  async getOpenRequest() {
    let records;
    const filter = { isClosed: false };
    await this.dbConn
      .getRecords(this.type, filter)
      .then(result => {
        records = this.populate(result);
      })
      .catch(function (err) {
        console.warn(err);
      });
    return records;
  }
}

module.exports = RequestService;
