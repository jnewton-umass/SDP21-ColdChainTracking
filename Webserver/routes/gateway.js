var express = require('express');
var router = express.Router();
var constants = require('../constants/constants')
var gatewayServices = require('../services/gateWayServices')
router.post('/start', async function(req, res, next) {
    await gatewayServices.registerGateway(req.body)
        .then(result  => {
            res.status(constants.ERROR_CODES.SUCCESS);
            res.send("Gateway Registered Successfully")
        })
        .catch(error => {
            res.status(constants.ERROR_CODES.FAILED);
            res.send(error);
        })
})

router.post('/end', async function(req, res, next){
    await gatewayServices.endTransit(req.body)
        .then(result  => {
            res.status(constants.ERROR_CODES.SUCCESS);
            res.send("Gateway Ended Transit Successfully")
        })
        .catch(error => {
            res.status(constants.ERROR_CODES.FAILED);
            res.send(error);
        })
})

module.exports = router;
