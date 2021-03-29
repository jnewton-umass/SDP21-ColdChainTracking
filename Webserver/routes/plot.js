var express = require('express');
var statusData = require("../models/statusModel.js")
var deliveredModel = require("../models/deliveredModel");
const inTransitModel = require('../models/inTransitModel.js');
var router = express.Router();

router.post('/', async function(req, res, next) {
    return new Promise(async function (resolve, reject) {
        const filter = {gatewayId: req.body.gatewayId}
        await deliveredModel.findOne(filter).then(async result => {
            if (result.length == 0){
                await inTransitModel.findOne(filter).then(result => {
                    return resolve(res.render('plot', {gatewayId: req.body.gatewayId, fiftyPlus: result.fiftyPlus, seventyPlus: result.seventyPlus, eightyPlus: result.eightyPlus, startTime: result.startTime}))
                })
                .catch(error => {
                    console.log(error)
                    return reject(error)
                })
            }
            else {
                return resolve(res.render('plot', {gatewayId: req.body.gatewayId, fiftyPlus: result.fiftyPlus, seventyPlus: result.seventyPlus, eightyPlus: result.eightyPlus, startTime: result.startTime}))
            }
                
        })
        .catch(error => {
            console.log(error)
            return reject(error)
        })
    })
 })

module.exports = router;
