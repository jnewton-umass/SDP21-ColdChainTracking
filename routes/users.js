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
      res.send(result);
    })
    .catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
    })
});

router.post('/login',async function(req, res, next) {
  var user = await userServices.login(req)
    .then(result => {
      res.status(constants.ERROR_CODES.SUCCESS);
      res.render('welcome', {
        username: result.body.userId,
        password: result.body.password,
        createdAt: result.body.createdAt
    });
    })
    .catch(error => {
      res.status(constants.ERROR_CODES.FAILED);
    })
});

module.exports = router;
