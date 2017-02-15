var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('TASK API PAGE');
});


module.exports = router;