var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'SDP-21 Cold Chain Tracking' });
});

module.exports = router;
