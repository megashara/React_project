//npm i mongodb
const MongoClient = require('mongodb').MongoClient;
 
//see https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp

const userName = 'ReadWriteUser'
const pass = 'Password'
const dbname = 'ClusterName'
const url = 'mongodb+srv://' + userName + ':'+ pass + '@clustername.2wk9k.mongodb.net/"' + dbname + '"?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
    var dbo = db.db("react_project");
    var user = {firstName : "Ivan", lastName : "Ivanov", age: 30};

    dbo.collection("user").insertOne(user, function(err, res) {
        if(err){ 
            console.log(err);
            return;
        }
        
        console.log(res.ops);
        db.close();
    });
});