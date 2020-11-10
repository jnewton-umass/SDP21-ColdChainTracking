var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var service = require('../services/userServices');
var constants = require('../constants/constants')
var statusServices = require('../services/statusServices');

router.post('/register',async function(req, res, next) {
  await statusServices.registerStatus(req)
    .then(result => {
      res.status(constants.ERROR_CODES.SUCCESS);
      console.log(result);
      res.send(result);
    })
    .catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
    })
});
router.post('/update',async function(req, res, next) {
  await statusServices.updateStatus(req)
    .then(result => {
      res.status(constants.ERROR_CODES.SUCCESS);
      console.log(result);
      res.send(result);
    }).catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
    })
});
module.exports = router;
