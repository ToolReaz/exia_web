const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Idea.GetAllIdeas(id).then((ideas) => {
                    res.json({'error': null, 'content': ideas});
                }).catch((reason) => {
                    res.json({'error': reason, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }

    },

    create: (req, res) => {
        let reqToken = req.cookies.token;
        let reqName = req.body.name;
        let reqText = req.body.text;
        let reqManifName = req.body.manifName;
        let reqmanifDescription = req.body.manifDescription;
        let reqManifImagePath = req.body.manifImagePath;
        let reqManifDate = req.body.manifDate;
        let reqManifInterval = req.body.manifInterval;
        let reqManifPrice = req.body.manifPrice;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then((id) => {
                let manif = [DB.Manifestation.CreateManifestation(reqManifName, reqmanifDescription, reqManifImagePath, reqManifDate, reqManifInterval, reqManifPrice)];
                DB.Idea.CreateIdea(id, reqName, reqText, manif).then(() => {
                    res.json({'error': null, 'content': null});
                })
            }).catch((reason) => res.json({'error': reason, 'content': null}));
        } else {
            res.json({'error': 'Pas connecté = pas créer idée !'});
        }
    },

    vote: (req, res, type) => {
        let reqVoteId = req.params.id;
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then((id) => {
                DB.Idea.VoteIdea(id, reqVoteId, type).then(() => {
                    res.json({'error': null, 'content': 'ok'});
                }).catch((reason => {
                    res.json({'error': 'Error: ' + reason, 'content': null})
                }));
            }).catch(reason => {
                res.json({'error': 'Error: ' + reason, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    },

    getVotes: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.params.id;

        if (reqToken) {
            DB.Idea.GetVoteForCount(reqId).then(votesFor => {
                DB.Idea.GetVoteAgainstCount(reqId).then(votesAgainst => {
                    res.json({'error': null, 'content': {'votesFor': votesFor, 'votesAgainst': votesAgainst}})
                }).catch(reason => {
                    res.json({'error': reason, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    },

    validate: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.params.id;
        let reqTitle = req.params.title;
        let reqDescription = req.params.description;

        if (reqToken) {
            DB.Compte.GetAccountFromToken(reqToken).then(id => {

            })
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    }
};