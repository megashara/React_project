const DbConnection    = require('../dbConnection/DbConnection.js')


class RequestService {
    constructor() {
        this.dbConn = new DbConnection();
        this.type = "request";
    }

    addRequest(request) {
        this.dbConn.addRecord(this.type, request);
    }

    closeRequest(userId, openDate, closeReason) {
        const condition = { userId, openDate }, newValues = {closeReason, isClosed: true}
        this.dbConn.updateRecord(this.type, condition, newValues);
        
    }

    getAllRequests() {
        return this.dbConn.getAllRecords(this.type);
    }
}

module.exports = RequestService