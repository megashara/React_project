const express = require('express');
const router = express.Router();
const User  = require('../entity/User.js')
const UserService = require('../service/UserService.js')
const url = require('url');


router.post('/', function (req, res) {
    const user = new User(req.body.login, req.body.password);
    new UserService().addUser(user).then(function(result) {  
        res.status(201).send(result); 
    });
});


router.get('/', function (req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    new UserService().getUser(query.login, query.password).then(function(result) { 
        if(!!result) { 
            res.status(200).send(result); 
        } else {
            res.status(404).send('User doesn\'t exist.'); 
        }
    });
});

module.exports = { router };