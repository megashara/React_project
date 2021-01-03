const express           = require('express');
const MongoClient       = require('mongodb').MongoClient;
const bodyParser        = require('body-parser');
const app               = express();
const User              = require('./entity/User.js')
const UserService       = require('./services/UserService.js')
const CarElement        = require('./entity/CarElement.js')
const CarElementService = require('./services/CarElementService.js')
const Request           = require('./entity/Request.js')
const RequestService    = require('./services/RequestService.js')


const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.use(function(req, res, next) {
	if (req.url == '/') {
    res.send('Hello');
    // let user = new User("Yana" , "Password" );
    // let userService = new UserService(); 
    // userService.addUser(user);

    // let carElem = new CarElement('Brake Pads', 'black'),
    // carElem2 = new CarElement('Suspention', 'gray'),
    // carElem3 = new CarElement('Brake Discs', 'gold');
    // const carElemService = new CarElementService();
    // carElemService.addCarElement(carElem);
    // carElemService.addCarElement(carElem2);
    // carElemService.addCarElement(carElem3);

    // let carElementBind = {carElementId: '5ff219285632dd503465842f', count: 3},
    // carElementBind2 = {carElementId: '5ff219285632dd5034658431', count: 1},
    // map = [carElementBind, carElementBind2];
    // let request = new Request('5ff21cb1083f3048109e85ee', map);
    // const requestService = new RequestService();
    // requestService.addRequest(request);

    // const requestServhice = new RequestService();
    // requestService.getRequest('5ff21e897861620fb4ccd830');
    // requestService.getAllRequests();

    // let carElementBind = {carElementId: '5ff219285632dd503465842f', count: 2},
    // carElementBind2 = {carElementId: '5ff219285632dd5034658431', count: 6},
    // map = [carElementBind, carElementBind2];
    // let request = new Request('5ff21cb1083f3048109e85ee', map);
    // const requestService = new RequestService();
    // requestService.addRequest(request);

} else {
	// } else {
		next(); 
	}
}); 
