const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {
        DB.Idea.GetAllIdeas().then((ideas) => {
            res.json({'error': null, 'content': ideas});
        }).catch((reason) => res.json({'error': 'Impossible de récupérer les idées !', 'content': null}));
    },

    create: (req, res) => {
        let reqName = req.body.name;
        let reqText = req.body.text;
        let reqToken = req.cookies.token;

        if (!reqName || !reqText || !reqToken) {
            res.json({'error': 'Champs incorrect ou connectez vous !'});
        } else {
            DB.Token.GetAccountFromToken(reqToken).then((id) => {
                DB.Idea.CreateIdea(id, reqName, reqText, null).then((success) => {
                    res.json({'error': null, 'content': null});
                })
            }).catch((reason) => res.json({'error': reason, 'content': null}));
        }
    },

    vote: (req, res) => {
        let reqVoteId = req.body.id;
        let reqToken = req.cookies.token;

        console.log('hey');

        DB.Token.GetAccountFromToken(reqToken).then((id) => {
            DB.Idea.VoteIdea(id, reqVoteId, true).then(() => {
                res.json({'error': null, 'content': null});
            }).catch((reason => res.json({'error': reason, 'content': null})));
        });
    }
};