var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.render('welcome', {
      username: req.body.username,
      password: req.body.password,
      createdAt: req.body.createdAt
  });
});

module.exports = router;
