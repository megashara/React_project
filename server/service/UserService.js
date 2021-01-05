const DbConnection = require('../dbConnection/DbConnection.js')
// const User = require('../entity/User.js')


class UserService {
    constructor() {
        this.dbConn = new DbConnection();
        this.type = "user";
    }

    async addUser(user) {
        await this.dbConn.addRecord(this.type, user).then(function(result) {  
            user = result;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return user;
    }

    async getUser(login, password) {
        let user;
        const filter = { login, password }
        await this.dbConn.getRecords(this.type, filter).then((result) => {
            user = result.length > 0 ? result[0] : null;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return user;
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

module.exports = UserService