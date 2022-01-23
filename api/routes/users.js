var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', function(req, res, next) {
  res.json({
    strring: 'get api dziala'
  })
});



module.exports = router;
