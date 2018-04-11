const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {

    },

    create: (req, res) => {
        let reqName = req.body.name;
        let reqDescription = req.body.description;
        let reqImagePath = req.body.imagePath;
        let reqDate = req.body.date;
        let reqPrice = req.body.price;
        let reqInterval = req.body.interval;
        let reqFree = req.body.free;

        if (!reqName) {
            res.json({'error': 'Champs invalides !'});
        } else {
            //DB.CreateManifestation
        }
    },

    subscribe: (req, res) => {

    }
};