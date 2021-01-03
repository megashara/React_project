const DbConnection    = require('../dbConnection/DbConnection.js')


class CarElementService {
    constructor() {
        this.dbConn = new DbConnection();
        this.type = "car_element";
    }

    addCarElement(carElem) {
        this.dbConn.addRecord(this.type, carElem);
    }

    getAllCarElements() {
        return this.dbConn.getAllRecords(this.type);
    }
}

module.exports = CarElementService