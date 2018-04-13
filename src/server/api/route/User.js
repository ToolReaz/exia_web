var express = require('express');
var router = express.Router();
let UserController = require('../controller/UserController');

router.post('/connect', (req, res, next) => {
    UserController.connect(req, res);
});

router.post('/register', (req, res, next) => {
    UserController.register(req, res);
});

router.post('/token', (req, res, next) => {
    UserController.register(req, res);
});

router.get('/account', (req, res, next) => {
    UserController.getAccount(req, res);
});

router.get('/disconnect', (req, res, next) => {
    UserController.disconnect(req, res);
});

router.get('/role', (req, res, next) => {
    UserController.getRole(req, res);
});

module.exports = router;