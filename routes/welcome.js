var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(message, req.body.username);
  res.render('welcome', {
      login: req.query.username,
      password: req.query.password
  });
});

module.exports = router;
