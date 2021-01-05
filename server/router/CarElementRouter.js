const express = require('express');
const router = express.Router();
const CarElement  = require('../entity/CarElement.js')
const CarElementService = require('../service/CarElementService.js')
var url = require('url');


router.post('/', function (req, res) {
    const carElement = new CarElement(req.body.name, req.body.carModel);
    new CarElementService().addCarElement(carElement).then(function(result) {  
        res.status(201).send(result); 
    });
});

router.get('/', function (req, res) {
    new CarElementService().getAllCarElements().then(function(result) {  
        res.status(200).send(result); 
    });
});

module.exports = { router };
