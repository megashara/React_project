
const express = require('express');
const router = express.Router();
const Request  = require('../entity/Request.js')
const RequestService = require('../service/RequestService.js')

router.get('/', function (req, res) {
    new RequestService().getAllRequests().then(function(result) {  
        res.status(200).send(result); 
    });
});

router.get('/:id', function (req, res) {
    new RequestService().getRequest(req.params.id).then(function(result) { 
        if(!!result) { 
            res.status(200).send(result); 
        } else {
            res.status(404).send('Request doesn\'t exist.'); 
        }
    });
});

router.post('/', function (req, res) {
    console.log('I am here!');
    const request = new Request(req.body.userId, req.body.carElementMap);
    new RequestService().addRequest(request).then(function(result) {  
        res.status(201).send(result); 
    });
});

// router.post('/', function (req, res) {
//     new RequestService().addRequest();
//     res.status(201).send('create item!');
// });

module.exports = { router };