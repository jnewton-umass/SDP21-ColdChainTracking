var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.render('welcome', {
      login: req.body.username,
      password: req.body.password,
      
  });
});

module.exports = router;
