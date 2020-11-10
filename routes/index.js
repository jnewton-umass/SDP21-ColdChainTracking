var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Cold Chain Tracking', authors: 'John Newton, Cam Harvey, and Calvin Lee'});
});

module.exports = router;
