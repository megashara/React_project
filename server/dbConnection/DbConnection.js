const MongoClient = require('mongodb').MongoClient;

class DbConnection{
    constructor() {
        const userName = 'ReadWriteUser', pass = 'Password', dbname = 'ClusterName';
        this.url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';
    }
   
   addRecord(type, obj) {
        MongoClient.connect(this.url, function(err, db) {
            if(err) throw err;
            let dbo = db.db("react_project");
            dbo.collection(type).insertOne(obj, function(err, res) {
                if(err) throw err;
                db.close();
            });
        });
    }

    //TODO: we faced up with issue: the query result available in callback fuction, but we can't return this value.
    //Probably we should use 'promises', but we don't know how.
    //See example:

    // async getRecords(type, filter) {
    //     const TYPE = "user";
    //      await MongoClient.connect(this.url, function(err, db) {
    //         let dbo = db.db("react_project");
    //         let myPromise = () => {
    //             return new Promise((resolve, reject) => {
    //                 dbo.collection(TYPE).find(filter).toArray(function(err, data) {
    //                     err 
    //                     ? reject(err) 
    //                     : resolve(data);
    //                     console.log("JSON: " + JSON.stringify(data));
    //                 });
    //             });
    //         };
    //         var result = myPromise();
    //         db.close();
    //         console.log("JSON2: " + JSON.stringify(result));
    //         return JSON.stringify(result);
    //     });
    // }

    getRecords(type, filter) {
        let records = [];
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("react_project");
            dbo.collection(type).find(filter).toArray(function(err, res) {
                if (err) throw err;
                records = res;
                db.close();
                console.log("Response: " + res);
            });
        });
        return JSON.stringify(records);
    }  


    getAllRecords(type, obj) {
        let records = [];
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("react_project");
            dbo.collection(type).find({}).toArray(function(err, res) {
                if (err) throw err;
                records = res;
                db.close();
                console.log(JSON.stringify(records));
            });
        });
        return JSON.stringify(records);
    }   

    //need to verify
    updateRecord(type, condition, newValues) {
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
             let dbo = db.db("react_project");
             console.log("condition: " +  JSON.stringify(condition) + " ;   New values: " +  JSON.stringify(newValues));
             dbo.collection(type).updateOne(condition, { $set: newValues }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    }


    deleteRecord(type, id) {
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("react_project");
            dbo.collection(type).deleteOne({ id }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    }    

}

module.exports = DbConnection