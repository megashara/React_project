const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

class DbConnection {
  constructor() {
    const userName = "ReadWriteUser",
      pass = "Password",
      dbname = "ClusterName";
    this.url =
      "mongodb+srv://" +
      userName +
      ":" +
      pass +
      '@clustername.2wk9k.mongodb.net/"' +
      dbname +
      '"?retryWrites=true&w=majority';
    this.databaseName = "react_project";
  }

  async addRecord(type, obj) {
    let promise = () => {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.url, (err, db) => {
          if (err) throw err;
          let dbo = db.db(this.databaseName);
          dbo.collection(type).insertOne(obj, (err, data) => {
            err ? reject(err) : resolve(data);
            db.close();
          });
        });
      });
    };
    let result = await promise();
    return result.ops[0];
  }

  async getRecords(type, filter) {
    let promise = () => {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.url, (err, db) => {
          if (err) throw err;
          let dbo = db.db(this.databaseName);
          // console.log("Filter:" + JSON.stringify(filter));
          dbo
            .collection(type)
            .find(filter)
            .toArray((err, data) => {
              // console.log("Data: " + JSON.stringify(data));
              //console.log("Error: " + err);
              err ? reject(err) : resolve(data);
              db.close();
            });
        });
      });
    };
    let result = await promise();
    return result;
  }

  async getAllRecords(type) {
    let promise = () => {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.url, (err, db) => {
          if (err) throw err;
          let dbo = db.db(this.databaseName);
          dbo
            .collection(type)
            .find({})
            .toArray((err, data) => {
              err ? reject(err) : resolve(data);
              db.close();
            });
        });
      });
    };
    let result = await promise();
    return result;
  }

  async updateRecord(type, condition, newValues) {
    let promise = () => {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.url, (err, db) => {
          if (err) throw err;
          let dbo = db.db(this.databaseName);
          console.log(
            "CONDITION: " +
              JSON.stringify(condition) +
              " ;   New values: " +
              JSON.stringify(newValues)
          );
          dbo
            .collection(type)
            .updateOne(condition, { $set: newValues }, (err, data) => {
              err ? reject(err) : resolve(data);
              db.close();
            });
        });
      });
    };
    let result = await promise();
    return result.result.nModified > 0;
  }

  async deleteRecord(type, id) {
    let promise = () => {
      return new Promise((resolve, reject) => {
        const filter = { _id: ObjectId(id) };
        MongoClient.connect(this.url, (err, db) => {
          if (err) throw err;
          let dbo = db.db(this.databaseName);
          dbo.collection(type).deleteOne(filter, (err, data) => {
            err ? reject(err) : resolve(data);
            db.close();
          });
        });
      });
    };
    let result = await promise();
    console.log("DATABAS: " + JSON.stringify(result.deletedCount));
    return result.deletedCount > 0;
  }
}

module.exports = DbConnection;
