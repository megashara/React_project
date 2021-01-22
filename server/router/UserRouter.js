const express = require('express');
const router = express.Router();
const User  = require('../entity/User.js')
const UserService = require('../service/UserService.js')
const url = require('url');
var session = require('express-session')
redisStorage = require('connect-redis')(session),
redis = require('redis'),
client = redis.createClient()

router.post('/', function (req, res) {
    const user = new User(req.body.login, req.body.password);
    new UserService().addUser(user).then(function(result) {  
        if(!!result){
            res.status(201).send(result); 
        } else {
            res.status(409).send('User already exist'); 
        }
    });
});


router.get('/', function (req, res) {
        if (!req.session.key){
            const url_parts = url.parse(req.url, true);
            const query = url_parts.query;
            console.log(req.sessionID);
            req.session.key = {key: req.sessionID, login: query.login};
            console.log(req.session.key);
            console.log(req.session);
            new UserService().getUser(query.login, query.password).then(function(result) { 
                if(!!result) { 
                    res.status(200).send(result); 
                } else {
                    res.status(404).send('User doesn\'t exist.'); 
                }
            });
        } else {
            res.status(200).send(req.session.key[req.sessionID].login);  
        }
   
});

module.exports = { router };