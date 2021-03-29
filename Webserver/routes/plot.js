var express = require('express');
var statusData = require("../models/statusModel.js")
var router = express.Router();

router.post('/', async function(req, res, next) {
    let temp1 = [];
    let temp2 = [];
    let lat = [];
    let lon =  [];
    return new Promise(async function (resolve, reject) {
        const filter = {gatewayId: req.body.gatewayId}
        await statusData.find(filter).then(result => {
            console.log(result);
            result.forEach(el => {
                temp1.push(el.tempCeil);
                temp2.push(el.tempSide);
                lat.push(el.latitude);
                lon.push(el.longitude);
            });
            console.log(temp1);
            console.log(temp2);
            console.log(lat);
            console.log(lon);
            res.render('plot', {tempCeil: temp1, tempSide: temp2, latitude: lat, longitude: lon}, (error, result)  => {
                console.log(error, result)
                return resolve(res.render(result))
            });
        })
        .catch(error => {
            console.log(error)
            return reject(error)
        })
    })
});

module.exports = router;
