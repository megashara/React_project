const DbConnection = require('../dbConnection/DbConnection.js')
var ObjectId = require('mongodb').ObjectID;



class RequestService {
    constructor() {
        this.dbConn = new DbConnection();
        this.type = "request";
    }

    async addRequest(request) {
        await this.dbConn.addRecord(this.type, request).then(function(result) {  
            request = result;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return request;
    }

    async getRequest(id) {
        const filter = { '_id' : ObjectId(id) }
        let request;
        await this.dbConn.getRecords(this.type, filter).then(function(result) {  
            request = !!result ? result[0] : result;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return request;
    }

    closeRequest(userId, openDate, closeReason) {
        const condition = { userId, openDate }, newValues = {closeReason, isClosed: true}
        this.dbConn.updateRecord(this.type, condition, newValues);
    }

    async getAllRequests() {
        let records;
         await this.dbConn.getAllRecords(this.type).then(function(result) {  
            records = result;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return records;
    }
}

module.exports = RequestService