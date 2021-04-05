var express = require('express');
var statusData = require("../models/statusModel.js")
var deliveredModel = require("../models/deliveredModel");
const inTransitModel = require('../models/inTransitModel.js');
var router = express.Router();
var  Plotly = require('plotly');
router.post('/', async function(req, res, next) {
    return new Promise(async function (resolve, reject) {
        const filter = {gatewayId: req.body.gatewayId};
        await deliveredModel.findOne(filter).then(async result => {
            if (result == null){
                await inTransitModel.findOne(filter).then(async result => {
                    let longitude =  [];
                    let latitude = [];
                    let tempCeil = [];
                    let tempSide = [];
                    let avgTemp = [];
                    let time = [];
                    await statusData.find(filter).forEach(statusUpdate => {
                        longitude.push(statusUpdate.longitude);
                        latitude.push(statusUpdate.latitude);
                        tempCeil.push(statusUpdate.tempCeil);
                        tempSide.push(statusUpdate.tempSide);
                        avgTemp.push((statusUpdate.tempCeil + statusUpdate.tempSide)/2.0);
                        time.push(statusUpdate.updatedAt);
                    })
                    var data = [{
                        type: 'scattergeo',
                        mode: 'markers',
                        lon: longitude,
                        lat: latitude,
                        marker: {
                            size: 2
                        },
                        name: 'Status Update Points',
                    }];
                    var layout = {
                        title: 'Status Update Points',
                        font: {
                            family: 'Droid Serif, serif',
                            size: 6
                        }
                    };
                    return resolve(res.render('plot', {gatewayId: req.body.gatewayId, fiftyPlus: result.fiftyPlus, seventyPlus: result.seventyPlus, eightyPlus: result.eightyPlus, startTime: result.startTime}, function (err, html) {
                        let plot = html.getElementById('plot');
                        Plotly.newPlot(plot, data, layout);
                        res.send(html);
                    }));
                })
                .catch(error => {
                    console.log(error)
                    return reject(error)
                })
            }
            else {
                await inTransitModel.findOne(filter).then(async result => {
                    let longitude =  [];
                    let latitude = [];
                    let tempCeil = [];
                    let tempSide = [];
                    let avgTemp = [];
                    let time = [];
                    await statusData.find(filter).then(result2 => {
                        result2.forEach(statusUpdate => {
                            longitude.push(statusUpdate.longitude);
                            latitude.push(statusUpdate.latitude);
                            tempCeil.push(statusUpdate.tempCeil);
                            tempSide.push(statusUpdate.tempSide);
                            avgTemp.push((statusUpdate.tempCeil + statusUpdate.tempSide)/2.0);
                            time.push(statusUpdate.updatedAt);
                        })
                        var data = [{
                            type: 'scattergeo',
                            mode: 'markers',
                            lon: longitude,
                            lat: latitude,
                            marker: {
                                size: 2
                            },
                            name: 'Status Update Points',
                        }];
                        var layout = {
                            title: 'Status Update Points',
                            font: {
                                family: 'Droid Serif, serif',
                                size: 6
                            }
                        };
                        console.log(data);
                    })
                    return resolve(res.render('plot', {gatewayId: req.body.gatewayId, fiftyPlus: result.fiftyPlus, seventyPlus: result.seventyPlus, eightyPlus: result.eightyPlus, startTime: result.startTime}, function (err, html) {
                        console.log(html);
                        res.send(html);
                    })
                    .catch(err => {
                        console.log(err);
                    }))
            })
        }})
    })
})
module.exports = router;
