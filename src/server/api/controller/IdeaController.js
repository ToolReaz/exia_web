const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {
        DB.GetAllIdeas((result) => {
            console.log(result);
            res.json({'error': null, 'ideas': result.dataValues});
        });
        res.json({'error': 'Impossible de récupérer les données sur le server !'});
    }
};