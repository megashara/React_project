const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const props = {
  port: 8000,
  userRouter: require('./router/UserRouter.js'),
  requestRouter: require('./router/RequestRouter.js'),
  carElementRouter: require('./router/CarElementRouter.js'),
  bidRouter: require('./router/BidRouter.js'),
}

app.listen(props.port, function () {
  console.log('app running on port ' + props.port);
}); 
app.use(bodyParser.json());

app.use('/user', props.userRouter.router); 
app.use('/request', props.requestRouter.router); 
app.use('/car_element', props.carElementRouter.router); 
app.use('/bid', props.bidRouter.router); 


// const express           = require('express');
// const MongoClient       = require('mongodb').MongoClient;
// const bodyParser        = require('body-parser');
// const app               = express();
// const User              = require('./entity/User.js')
// const UserService       = require('./service/UserService.js')
// const CarElement        = require('./entity/CarElement.js')
// const CarElementService = require('./service/CarElementService.js')
// const Request           = require('./entity/Request.js')
// const RequestService    = require('./service/RequestService.js')


// const port = 8000;
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });

// app.use(function(req, res, next) {
// 	if (req.url == '/') {
//     res.send('Hello');
//     // let user = new User("Yana" , "Password" );
//     // let userService = new UserService(); 
//     // userService.addUser(user);

//     // let carElem = new CarElement('Brake Pads', 'black'),
//     // carElem2 = new CarElement('Suspention', 'gray'),
//     // carElem3 = new CarElement('Brake Discs', 'gold');
//     // const carElemService = new CarElementService();
//     // carElemService.addCarElement(carElem);
//     // carElemService.addCarElement(carElem2);
//     // carElemService.addCarElement(carElem3);

//     // let carElementBind = {carElementId: '5ff219285632dd503465842f', count: 3},
//     // carElementBind2 = {carElementId: '5ff219285632dd5034658431', count: 1},
//     // map = [carElementBind, carElementBind2];
//     // let request = new Request('5ff21cb1083f3048109e85ee', map);
//     // const requestService = new RequestService();
//     // requestService.addRequest(request);

//     // const requestServhice = new RequestService();
//     // requestService.getRequest('5ff21e897861620fb4ccd830');
//     // requestService.getAllRequests();

    // let carElementBind = {carElementId: '5ff219285632dd503465842f', count: 2},
    // carElementBind2 = {carElementId: '5ff219285632dd5034658431', count: 6},
    // map = [carElementBind, carElementBind2];
    // let request = new Request('5ff21cb1083f3048109e85ee', map);
    // const requestService = new RequestService();
    // requestService.addRequest(request);

// } else {
// 	// } else {
// 		next(); 
// 	}
// }); 
