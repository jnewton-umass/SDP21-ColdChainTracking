var express = require('express');
var statusData = require("../models/statusModel.js")
var deliveredModel = require("../models/deliveredModel")
var router = express.Router();

router.post('/', async function(req, res, next) {
    /*let temp1 = [];
    let temp2 = [];
    let lat = [];
    let lon =  [];*/
    return new Promise(async function (resolve, reject) {
        const filter = {gatewayId: req.body.gatewayId}
        await deliveredModel.findOne(filter).then(result => {
            /*console.log(result);
            result.forEach(el => {
                temp1.push(el.tempCeil);
                temp2.push(el.tempSide);
                lat.push(el.latitude);
                lon.push(el.longitude);*/
                return resolve(res.render('plot', {gatewayId: req.body.gatewayId, fiftyPlus: result.fiftyPlus, seventyPlus: result.seventyPlus, eightyPlus: result.eightyPlus, startTime: result.startTime}))
            })
            .catch(error => {
                console.log(error)
                return reject(error)
            })
            /*console.log(temp1);
            console.log(temp2);
            console.log(lat);
            console.log(lon);*/
            
    })
 })

module.exports = router;
