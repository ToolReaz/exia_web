const DB = require('../model/DB');

module.exports = {


    /**
     * GET /api/idea
     * Send in JSON all ideas contained in the database
     * @param req Represent the request
     * @param res Represent the response
     */
    getAll: (req, res) => {
        // The token set in the cookies
        let reqToken = req.cookies.token;

        // Verify if auth token is set
        if (reqToken) {
            // Get user id from token
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                // Get all ideas from database
                DB.Idea.GetAllIdeas(id).then((ideas) => {
                    // Send ideas
                    res.json({'error': null, 'content': ideas});
                }).catch((reason) => {
                    // Catch DB errors
                    res.json({'error': reason, 'content': null});
                });
            }).catch(reason => {
                // Catch DB errors
                res.json({'error': reason, 'content': null});
            });
        } else {
            // If user isn't connected he can't use this method
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    },


    /**
     * GET /api/idea/:id
     * Send in JSON a specified idea contained in the database
     * @param req Represent the request
     * @param res Represent the response
     */
    get: (req, res) => {
        // The token set in the cookies
        let reqToken = req.cookies.token;
        // The Idea's ID contained  in the URL
        let reqID = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Idea.GetIdeaFromId(reqID).then((idea) => {
                    res.json({'error': null, 'content': idea});
                }).catch((reason) => {
                    // Catch DB errors
                    res.json({'error': reason, 'content': null});
                });
            }).catch(reason => {
                // Catch DB errors
                res.json({'error': reason, 'content': null});
            });
        } else {
            // Catch DB errors
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }

    },


    /**
     * GET /api/idea/invalidated
     * Send in JSON all invalidated ideas contained in the database
     * @param req Represent the request
     * @param res Represent the response
     */
    getInvalidated: (req, res) => {
        // The token set in the cookies
        let reqToken = req.cookies.token;
        console.log(reqToken);

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                console.log(id);
                DB.Idea.GetAllIdeas(id).then(ideas => {
                    console.log(ideas);
                    res.json({'error': null, 'content': ideas});
                }).catch((reason) => {
                    // Catch DB errors
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                // Catch DB errors
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    },


    /**
     * POST /api/idea
     * Create a new Idea and send a null response in JSON all ideas contained in the database
     * @param req Represent the request
     * @param res Represent the response
     */
    create: (req, res) => {
        // The token set in the cookies
        let reqToken = req.cookies.token;
        let reqName = req.body.name;
        let reqText = req.body.text;
        let reqManifName = req.body.manifName;
        let reqManifDescription = req.body.manifDescription;
        let reqManifImagePath = req.body.manifImagePath;
        let reqManifDate = req.body.manifDate;
        let reqManifInterval = req.body.manifInterval;
        let reqManifPrice = req.body.manifPrice;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then((id) => {
                let manif = [DB.Manifestation.CreateManifestation(reqManifName, reqManifDescription, reqManifImagePath, reqManifDate, reqManifInterval, reqManifPrice)];
                DB.Idea.CreateIdea(id, reqName, reqText, manif).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch((reason) => res.json({'error': reason.message, 'content': null}));
                // Catch DB errors
            }).catch((reason) => res.json({'error': reason.message, 'content': null}));
        } else {
            res.json({'error': 'Pas connecté = pas créer idée !'});
        }
    },


    /**
     *
     *
     * @param req Represent the request
     * @param res Represent the response
     */
    vote: (req, res, type) => {
        let reqVoteId = req.params.id;
        // The token set in the cookies
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then((id) => {
                DB.Idea.VoteIdea(id, reqVoteId, type).then(() => {
                    res.json({'error': null, 'content': 'ok'});
                }).catch((reason => {
                    // Catch DB errors
                    res.json({'error': 'Error: ' + reason, 'content': null})
                }));
            }).catch(reason => {
                // Catch DB errors
                res.json({'error': 'Error: ' + reason, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    },


    /**
     * GET /api/idea/votes/:id
     * Send in JSON the votes of an Ideas contained in the database
     * @param req Represent the request
     * @param res Represent the response
     */
    getVotes: (req, res) => {
        // The token set in the cookies
        let reqToken = req.cookies.token;
        let reqId = req.params.id;

        if (reqToken) {
            DB.Idea.GetVoteForCount(reqId).then(votesFor => {
                DB.Idea.GetVoteAgainstCount(reqId).then(votesAgainst => {
                    res.json({'error': null, 'content': {'votesFor': votesFor, 'votesAgainst': votesAgainst}});
                }).catch(reason => {
                    // Catch DB errors
                    res.json({'error': reason, 'content': null});
                });
            }).catch(reason => {
                // Catch DB errors
                res.json({'error': reason, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    },


    /**
     * POST /api/idea/validate
     * Validate an Idea send a null response in JSON all ideas contained in the database
     * @param req Represent the request
     * @param res Represent the response
     */
    validate: (req, res) => {
        // The token set in the cookies
        let reqToken = req.cookies.token;
        let reqId = req.body.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Idea.ValidateIdea(id, reqId).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    // Catch DB errors
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                // Catch DB errors
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes pas connecté !", 'content': null});
        }
    }
};