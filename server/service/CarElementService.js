const DbConnection    = require('../dbConnection/DbConnection.js')


class CarElementService {
    constructor() {
        this.dbConn = new DbConnection();
        this.type = "car_element";
    }

    async addCarElement(carElem) {
        await this.dbConn.addRecord(this.type, carElem).then((result) => {  
            carElem = result;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return carElem;
    }

    async getAllCarElements() {
        let carElements;
         await this.dbConn.getAllRecords(this.type).then((result) => {  
            carElements = result;
        })
        .catch(function (err) {
            console.warn(err);
        });
        return carElements;
    }
}

module.exports = CarElementService