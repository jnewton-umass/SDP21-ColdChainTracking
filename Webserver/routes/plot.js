var express = require('express');
var statusData = require("../models/statusModel.js")
var router = express.Router();

router.post('/', async function(req, res, next) {
    let temp1 = [];
    let temp2 = [];
    let lat = [];
    let lon =  [];
	await statusData.find({gatewayId: req.body.gatewayId}).then(result => {
        result.forEach(el => {
            console.log(el);
            temp1.push(el.tempCeil);
            temp2.push(el.tempSide);
            lat.push(el.latitude);
            lon.push(el.longitude);
        });
        console.log(temp1);
        console.log(temp2);
        console.log(lat);
        console.log(lon);
        res.render('plot', {temp1, temp2, lat, lon});
    });
});

module.exports = router;
