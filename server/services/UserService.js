const DbConnection    = require('../dbConnection/DbConnection.js')
// const User            = require('../entity/User.js')


class UserService {
    constructor() {
        this.dbConn = new DbConnection();
        this.type = "user";
    }

    addUser(user) {
        this.dbConn.addRecord(this.type, user);
    }

    getUser(login, password) {
        const filter = { login, password }
        return this.dbConn.getRecords(this.type, filter)[0];
        
    }

    getAllUsers() {
        return this.dbConn.getAllRecords(this.type);
    }
}

module.exports = UserService