const MongoClient = require('mongodb').MongoClient;

class DbConnection{
   
    
    static getConnection(){
        let userName = 'ReadWriteUser'
        let pass = 'Password'
        let dbname = 'ClusterName'
        let url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';
        MongoClient.connect(url, function(err, db) {
            console.log('connect');
            return db.db("react_project");
        });
    }

    static getTable(){
        return DbConnection.getConnection().collection("user");
    }
}

module.exports = DbConnection