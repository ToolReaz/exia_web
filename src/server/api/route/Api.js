var express = require('express');
var router = express.Router();
let ManifestationController = require('../controller/ManifestationController');

router.post('/manifestation', (req, res, next) => {
    ManifestationController.create(req, res);
});

module.exports = router;