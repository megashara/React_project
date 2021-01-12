const DbConnection = require('../dbConnection/DbConnection.js');
const ObjectId = require("mongodb").ObjectID;


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

    async getCarElementById(id) {
        let carElem;
        const filter = { _id: ObjectId(id) };
        await this.dbConn
        .getRecords(this.type, filter)
        .then((result) => {
            carElem = result.length > 0 ? result[0] : null;
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