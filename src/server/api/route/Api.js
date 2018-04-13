var express = require('express');
var router = express.Router();
let IdeaController = require('../controller/IdeaController');
let ManifestationController = require('../controller/ManifestationController');
let ShopController = require('../controller/ShopController');
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
// Get number of votes for an idea
router.get('/idea/votes/:id', (req, res) => {
    IdeaController.getVotes(req, res);
});
// Vote for an idea
router.get('/idea/vote/for/:id', (req, res) => {
    IdeaController.vote(req, res, true);
});
// Vote against an idea
router.get('/idea/vote/against/:id', (req, res) => {
    IdeaController.vote(req, res, false);
});



// MANIFESTATION
// Create a manifestation
router.get('/manifestation', (req, res) => {
    ManifestationController.getAll(req, res);
});
// Create a manifestation
router.post('/manifestation', (req, res) => {
    ManifestationController.create(req, res);
});
// Subscribe to a manifestation
router.post('/manifestation/subscribe/:id', (req, res) => {
    ManifestationController.subscribe(req, res);
});
// Validate to a manifestation
router.get('/manifestation/validate/:id', (req, res) => {
    ManifestationController.validate(req, res);
});




// SHOP
router.post('/shop/article', (req, res) => {
    ShopController.createArticle(req, res);
});
router.get('/shop/category', (req, res) => {
    ShopController.getAllCategories(req, res);
});
router.post('/shop/category', (req, res) => {
    ShopController.createCategory(req, res);
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