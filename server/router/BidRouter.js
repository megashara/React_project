const express = require('express');
const router = express.Router();
const Bid  = require('../entity/Bid.js')
const BidService = require('../service/BidService.js')
const url = require('url');


router.post('/', function (req, res) {
    console.log(req.body.carElementId, req.body.requestId )
    const bid = new Bid(req.body.carElementId, req.body.price, req.body.userId, req.body.requestId);
    new BidService().addBid(bid).then(function(result) {  
        res.status(201).send(result); 
    });
});

router.get('/', function (req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    let map = [];
    map.push({ 
        id: query.userId, 
        func: (id) => new BidService().getBidsByUserId(id).then(function(result) { 
            res.status(200).send(result); 
        })
    });
    map.push({
        id: query.requestId,
        func: (id) => new BidService().getBidsByRequestId(id).then(function(result) {  res.status(200).send(result); })
    });

    for (el of map) {
        console.log(el);
        if (!!el.id) {
            el.func(el.id);
            break;
        }
    }
});

router.get('/:id', function (req, res) {
    new BidService().getBid(req.params.id).then(function(result) { 
        if(!!result) { 
            res.status(200).send(result); 
        } else {
            res.status(404).send('Bid doesn\'t exist.'); 
        }
    });
});

router.delete('/:id', function (req, res) {
    console.log('In method');
    new BidService().deleteBid(req.params.id).then(function(result) {
        if(result) {
            res.status(204).send(''); 
        } else {
            res.status(404).send('Request is already deleted.'); 
        }
    });
});


module.exports = { router };
