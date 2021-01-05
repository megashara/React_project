class Bid {
    constructor(carElementId, price, userId, requestId){
        this.carElementId = carElementId;
        this.price = price;
        this.userId = userId;
        this.requestId = requestId;
    }
}

module.exports = Bid