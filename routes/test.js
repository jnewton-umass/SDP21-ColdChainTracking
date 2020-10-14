var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { 
      title: 'Cold Chain Tracking',
      authors: ['Jack Newton', 'Cam Harvey', 'Calvin Lee'],
      body: 'Welcome to our Cold Chain Tracking solution for Senior Design Project 2021.'
    });
});

module.exports = router;
