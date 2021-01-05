class Request {
    constructor(userId, carElementMap){
        this.userId = userId;
        this.carElementMap = carElementMap;
        this.openDate = new Date();
        this.isClosed = false;
        this.closeReason = ''; //Resolved, Removed
    }
}

module.exports = Request