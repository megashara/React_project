const DbConnection    = require('../dbConnection/DbConnection.js')
const User            = require('../entity/User.js')


class UserService{
    addUser(user){
      
        DbConnection.getTable().insertOne(user, function(err, res) {
            if(err){ 
                console.log(err);
                return;
            }
        
            console.log(res.ops);
            db.close();
        });
       
    }
}

module.exports = UserService