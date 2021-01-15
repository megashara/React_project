const DbConnection = require("../dbConnection/DbConnection.js");
const ObjectId = require("mongodb").ObjectID;

class UserService {
  constructor() {
    this.dbConn = new DbConnection();
    this.type = "user";
  }

  async addUser(user) {
    let hasUser = false;
    await this.hasUser(user.login).then(function(result) {  
      hasUser = result;
    });
    if(hasUser){
      return null
    }
    await this.dbConn
      .addRecord(this.type, user)
      .then(function (result) {
        user = result;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return user;
  }

  async getUser(login, password) {
    let user;
    const filter = { login, password };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        user = result.length > 0 ? result[0] : null;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return user;
  }

  async getUserById(id) {
    let user;
    const filter = { _id: ObjectId(id) };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        user = result.length > 0 ? result[0] : null;
      })
      .catch(function (err) {
        console.warn(err);
      });
    return user;
  }

  async hasUser(login) {
    let isExist;
    const filter = { login };
    await this.dbConn
      .getRecords(this.type, filter)
      .then((result) => {
        if(result.length != 0){
          isExist = true;
        }
      })
      .catch(function (err) {
        isExist = false;
      });
    return isExist;
  }

  // async getAllUsers() {
  //     let records;
  //      await this.dbConn.getAllRecords(this.type).then((result) => {
  //         records = result;
  //     })
  //     .catch(function (err) {
  //         console.warn(err);
  //     });
  //     return records;
  // }
}

module.exports = UserService;
