var express = require('express');
var router = express.Router();
var constants = require('../constants/constants')
var gatewayServices = require('../services/gateWayServices')
var inTransitModels = require('../models/inTransitModel')
var deliveredModels = require('../models/deliveredModel')

router.post('/start', async function(req, res, next) {
    return new Promise(async function (resolve, reject){
        await gatewayServices.registerGateway(req.body)
            .then(result  => {
                console.log(result);
                res.status(constants.ERROR_CODES.SUCCESS);
                res.send("Gateway Registered Successfully");
                return resolve(result);
            })
            .catch(error => {
                console.log(error);
                res.status(constants.ERROR_CODES.FAILED);
                res.send(error);
                return reject(error);
            })
        })
})

router.post('/end', async function(req, res, next){
    const query = {
        gatewayId: req.body.gatewayId
    }
    const newQuery = {
        gatewayId: req.body.gatewayId,
        deliveredTime: new Date()
    }
    inTransitModels.find(query, async function (err, records){
        await deliveredModels.insertMany(records)
        .then(async result1 => {
            console.log(result1)
            await inTransitModels.deleteMany(query)
            .then (result2 => {
                console.log(result2)
                res.status(constants.ERROR_CODES.SUCCESS);
                res.send("Gateway Deleted inTransit Successfully")
            })
        })
    })
})

module.exports = router;
