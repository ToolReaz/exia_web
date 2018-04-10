var express = require('express');
var router = express.Router();
let ManifestationController = require('../controller/ManifestationController');
let IdeaController = require('../controller/IdeaController');

router.post('/manifestation', (req, res, next) => {
    ManifestationController.create(req, res);
});

router.get('/idea', (req, res, next) => {
    IdeaController.getAll(req, res);
});

router.post('/idea', (req, res, next) => {
    IdeaController.create(req, res);
});

module.exports = router;