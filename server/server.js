const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const UserService    = require('./services/UserService.js')
const User           = require('./entity/User.js')

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.use(function(req, res, next) {
	if (req.url == '/') {
    let user = new User(1 , "ldad" , "2222222" );
    let userService = new UserService(); 
    res.send('Hello'); 
    userService.addUser(user);
	} else {
		next(); 
	}
}); 

