'use strict';

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)  => {
  res.render('index', { title: 'Capstone', nodeEnv: process.env.NODE_ENV });
});

module.exports = router;
