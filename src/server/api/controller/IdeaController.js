const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {
        DB.GetAllIdeas((result) => {
            res.json({'error': null, 'ideas': result});
        });
        //res.json({'error': 'Impossible de récupérer les données sur le server !'});
    },

    create: (req, res) => {
        let reqName = req.body.name;
    }
};