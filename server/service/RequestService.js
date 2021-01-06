const DbConnection = require("../dbConnection/DbConnection.js");
var ObjectId = require("mongodb").ObjectID;

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
    let request;
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        request = !!result ? result[0] : result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return request;
  }

  async closeRequest(id, closeReason) {
    let request;
    await this.getRequest(id).then(async (result) => {
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
      .then((result) => {
        records = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return records;
  }
}

module.exports = RequestService;
