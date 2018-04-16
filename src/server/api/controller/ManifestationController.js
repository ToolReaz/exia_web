const DB = require('../model/DB');

module.exports = {

    getAll: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetAllManifestations().then(manifestations => {
                    res.json({'error': null, 'content': manifestations});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                })
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas getallmanif !', 'content': null});
        }
    },

    create: (req, res) => {
        let reqToken = req.cookies.token;
        let reqTitle = req.body.title;
        let reqDescription = req.body.description;
        let reqImagePath = req.body.imagePath;
        let reqDate = req.body.date;

        if (reqToken) {
            DB.Compte.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.CreateManifestation();
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas créer manifestation !', 'content': null});
        }
    },

    subscribe: (req, res) => {
        let reqToken = req.cookies.token;
        let reqManifId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.Participe(id, reqManifId).then(ok => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas subscribe !', 'content': null});
        }
    },

    validate: (req, res) => {
        let reqToken = req.cookies.token;
        let reqIdeaId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Idea.ValideIdee(id, reqIdeaId).then(ok => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas valider idée !', 'content': null});
        }
    },

    update: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.params.id;
        let reqName = req.body.name;
        let reqDescription = req.body.description;
        let reqImagePath = req.body.imagePath;
        let reqDate = req.body.date;
        let reqPrice = req.body.price;
        let reqInterval = req.body.interval;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.EditManifestation(id, reqId, reqName, reqDescription, reqImagePath, reqDate, reqInterval, reqPrice, true).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas modifier manif !', 'content': null});
        }
    }
};