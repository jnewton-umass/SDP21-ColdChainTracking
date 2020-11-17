var express = require('express');
var router = express.Router();
var constants = require('../constants/constants')
var statusServices = require('../services/statusServices');

router.post('/register',async function(req, res, next) {
  await statusServices.registerStatus(req)
    .then(result => {
      res.status(constants.ERROR_CODES.SUCCESS);
      res.send("Successful Registration");
    })
    .catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
      res.send("Failed Registration")
    })
});
router.post('/update',async function(req, res, next) {
  await statusServices.updateStatus(req)
    .then(result => {
      res.status(constants.ERROR_CODES.SUCCESS);
      res.send("Successful Update");
    }).catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
      res.send("Failed Update");
    })
});
module.exports = router;
