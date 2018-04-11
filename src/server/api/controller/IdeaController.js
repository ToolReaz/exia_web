const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {
        DB.Idea.GetAllIdeas((result) => {
            res.json({'error': null, 'ideas': result});
        });
        //res.json({'error': 'Impossible de récupérer les données sur le server !'});
    },

    create: (req, res) => {
        let reqName = req.body.name;
        let reqText = req.body.text;
        let reqToken = req.body.token;

        if (!reqName || !reqText || !reqToken) {
            res.json({'error': 'Champs incorrect !'});
        } else {
            DB.Token.GetTokenTime(reqToken, (callback) =>  {
                console.log(callback);
            })
        }
    },

    vote: (req, res) => {

    }
};