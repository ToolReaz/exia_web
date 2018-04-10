var express = require('express');
var router = express.Router();
let ManifestationController = require('../controller/ManifestationController');
let IdeaController = require('../controller/IdeaController');

router.post('/manifestation', (req, res, next) => {
    ManifestationController.create(req, res);
});

router.get('/idea', (req, res, next) => {
    console.log(('zegùmuhzeigeiug00'));
    IdeaController.getAll(req, res);
});

module.exports = router;