var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var service = require('../services/userServices');
var constants = require('../constants/constants')
var userServices = require('../services/userServices');

router.post('/register',async function(req, res, next) {
  await userServices.register(req)
    .then(result => {
      res.status(constants.ERROR_CODES.SUCCESS);
      console.log(result);
      res.render('welcome', result);
    })
    .catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
      res.send(error);
    })
});

router.post('/login',async function(req, res, next) {
  var user = await userServices.login(req)
    .then(result => {
      if (result == null) {
        theError = "invalid username or password";
        res.status(constants.ERROR_CODES.FAILED);
        res.render('error', theError);
      }
      else {
        res.status(constants.ERROR_CODES.SUCCESS);
        res.render('welcome', result);
      }
    })
    .catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
      res.render('error');
    })
});

module.exports = router;
