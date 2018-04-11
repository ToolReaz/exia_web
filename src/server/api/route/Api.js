var express = require('express');
var router = express.Router();
let IdeaController = require('../controller/IdeaController');
let ManifestationController = require('../controller/ManifestationController');
let PaypalController = require('../controller/PaypalController');
let PhotoController = require('../controller/PhotoController');


// IDEA
// Get all ideas
router.get('/idea', (req, res) => {
    IdeaController.getAll(req, res);
});
// Create an idea
router.post('/idea', (req, res) => {
    IdeaController.create(req, res);
});
// Vote for an idea
router.get('/idea/vote/:type/:id', (req, res) => {
    IdeaController.vote(req, res);
});




// MANIFESTATION
// Create a manifestation
router.post('/manifestation', (req, res) => {
    ManifestationController.create(req, res);
});
// Subscribe to a manifestation
router.post('/manifestation/subscribe/:id', (req, res) => {
    ManifestationController.subscribe(req, res);
});




// PAYPAL
router.get('/paypal', (req, res) => {
    PaypalController.set(req, res);
});




// PHOTO
router.post('/photo/add', (req, res) => {
    PhotoController.add(req, res);
});
router.post('/photo/comment/:id', (req, res) => {
    PhotoController.comment(req, res);
});
router.get('/photo/like/:id', (req, res) => {
    PhotoController.like(req, res);
});
router.get('/photo/likes/:id', (req, res) => {
    PhotoController.getLikeCount(req, res);
});


module.exports = router;