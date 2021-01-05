const MongoClient = require('mongodb').MongoClient;

class DbConnection {
    constructor() {
        const userName = 'ReadWriteUser', pass = 'Password', dbname = 'ClusterName';
        this.url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';
        this.databaseName = 'react_project';
    }
   
    async addRecord(type, obj) {
        let promise = () => {
            return new Promise((resolve, reject) => {    
                MongoClient.connect(this.url, (err, db) => {
                    if(err) throw err;
                    let dbo = db.db(this.databaseName);
                    dbo.collection(type).insertOne(obj, function(err, data) {
                        err ? reject(err) : resolve(data);
                        db.close();
                    });
                });
            });
        };
        let result = await (promise());
        return result.ops[0];
   }

    async getRecords(type, filter) {
        let promise = () => {
            return new Promise((resolve, reject) => {
                MongoClient.connect(this.url, (err, db) => {
                    if (err) throw err;
                    let dbo = db.db(this.databaseName);
                    console.log("Filter:" + JSON.stringify(filter));
                    dbo.collection(type).find(filter).toArray(function(err, data) {
                        console.log('Data: ' + JSON.stringify(data));
                        console.log('Error: ' + err);
                        err ? reject(err) : resolve(data);
                        db.close();
                    });
                });
            });
        };
        let result = await (promise());
        return result;
    }  


    async getAllRecords(type) {
        let promise = () => {
            return new Promise((resolve, reject) => {
                MongoClient.connect(this.url, (err, db) => {
                    if (err) throw err;
                    let dbo = db.db(this.databaseName);
                    dbo.collection(type).find({}).toArray(function(err, data) {
                        err ? reject(err) : resolve(data);
                        db.close();
                    });
                });
            });
         };
        let result = await (promise());
        return result;
    }   


    //need to verify
    updateRecord(type, condition, newValues) {
        MongoClient.connect(this.url, (err, db) => {
            if (err) throw err;
             let dbo = db.db(this.databaseName);
             console.log("condition: " +  JSON.stringify(condition) + " ;   New values: " +  JSON.stringify(newValues));
             dbo.collection(type).updateOne(condition, { $set: newValues }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    }


    deleteRecord(type, id) {
        MongoClient.connect(this.url, (err, db) => {
            if (err) throw err;
            let dbo = db.db(this.databaseName);
            dbo.collection(type).deleteOne({ id }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    }    

}

module.exports = DbConnection