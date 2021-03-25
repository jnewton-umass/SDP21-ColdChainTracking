var express = require('express');
var router = express.Router();
var constants = require('../constants/constants')
var gatewayServices = require('../services/gateWayServices')
router.post('/', async function(req, res, next) {
    if (req.isDelivered == 0) {
        await gatewayServices.registerGateway(req)
            .then(result  => {
                res.status(constants.ERROR_CODES.SUCCESS);
                res.send("Gateway Registered Successfully")
            })
            .catch(error => {
                res.status(constants.ERROR_CODES.FAILED);
                res.send(error);
            })
    }
    else {
        await gatewayServices.endTransit(req)
            .then(result  => {
                res.status(constants.ERROR_CODES.SUCCESS);
                res.send("Gateway Ended Transit Successfully")
            })
            .catch(error => {
                res.status(constants.ERROR_CODES.FAILED);
                res.send(error);
            })
    }
});

module.exports = router;
