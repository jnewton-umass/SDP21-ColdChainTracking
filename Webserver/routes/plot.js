var express = require('express');
var statusData = require("../models/statusModel.js")
var deliveredModel = require("../models/deliveredModel");
const inTransitModel = require('../models/inTransitModel.js');
var router = express.Router();
router.post('/', async function(req, res, next) {
    return new Promise(async function (resolve, reject) {
        const filter = {gatewayId: req.body.gatewayId};
        await deliveredModel.findOne(filter).then(async result => {
            if (result == null){
                await inTransitModel.findOne(filter).then(async result2 => {
                    let longitude =  [];
                    let latitude = [];
                    let tempCeil = [];
                    let tempSide = [];
                    let avgTemp = [];
                    let time = [];
                    await statusData.find(filter).then(result3 => {
                        result3.forEach(statusUpdate => {
                            longitude.push(statusUpdate.longitude);
                            latitude.push(statusUpdate.latitude);
                            tempCeil.push(statusUpdate.tempCeil);
                            tempSide.push(statusUpdate.tempSide);
                            avgTemp.push((statusUpdate.tempCeil + statusUpdate.tempSide)/2.0);
                            time.push(statusUpdate.updatedAt);
                        })
                        var templateData = {
                            gatewayId: req.body.gatewayId, 
                            fiftyPlus: result2.fiftyPlus, 
                            seventyPlus: result2.seventyPlus, 
                            eightyPlus: result2.eightyPlus, 
                            startTime: result2.startTime, 
                            avgTemp: avgTemp, 
                            tempCeil: tempCeil, 
                            tempSide: tempSide, 
                            time: time,
                            longitude: longitude,
                            latitude: latitude
                        };
                        console.log(templateData);
                        return resolve(res.render('plot', templateData));
                    })
                    .catch(error => {
                        console.log(error)
                        return reject(error)
                    })
                })
                .catch(error => {
                    console.log(error)
                    return reject(error)
                })
            }
            else {
                let longitude =  [];
                let latitude = [];
                let tempCeil = [];
                let tempSide = [];
                let avgTemp = [];
                let time = [];
                await statusData.find(filter).then(result3 => {
                    result3 = result3.sort(function(update1, update2) {
                        let up1 = Date.parse(update1.updatedAt);
                        let up2 = Date.parse(update2.updatedAt);
                        if  (up1 < up2) return -1;
                        else if (up1 > up2) return 1;
                        else return 0;
                    })
                    result3.forEach(statusUpdate => {
                        longitude.push(statusUpdate.longitude);
                        latitude.push(statusUpdate.latitude);
                        tempCeil.push(statusUpdate.tempCeil);
                        tempSide.push(statusUpdate.tempSide);
                        avgTemp.push((statusUpdate.tempCeil + statusUpdate.tempSide)/2.0);
                        time.push(statusUpdate.updatedAt);
                    })
                    var templateData = {
                        gatewayId: req.body.gatewayId, 
                        fiftyPlus: result.fiftyPlus, 
                        seventyPlus: result.seventyPlus, 
                        eightyPlus: result.eightyPlus, 
                        startTime: result.startTime, 
                        avgTemp: avgTemp, 
                        tempCeil: tempCeil, 
                        tempSide: tempSide, 
                        time: time,
                        longitude: longitude,
                        latitude: latitude
                    };
                    console.log(templateData);
                    return resolve(res.render('plot', templateData))
                })
                .catch(error => {
                    console.log(error)
                    return reject(error)
                })
            }
        })
        .catch(error => {
            console.log(error)
            return reject(error)
        })
    })
})
module.exports = router;
