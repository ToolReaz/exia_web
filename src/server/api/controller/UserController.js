const DB = require('../model/DB');
let bcrypt = require('bcrypt');

module.exports = {

    connect: (req, res) => {

        let reqEmail = req.body.email;
        let reqPassword = req.body.password;

        if (!reqEmail || !reqPassword) {
            res.json({'error': 'Pseudo ou mot de passe invalide !'});
        } else {
            DB.Compte.GetAccount(reqEmail).then(account => {
                let dbPassword = account.dataValues.Mot_de_passe;
                bcrypt.compare(reqPassword, dbPassword, (err, ok) => {
                    if (ok) {
                        let newToken = require('crypto').randomBytes(64).toString('hex');
                        DB.Compte.SetToken(account.ID, newToken).then(session => {
                            res.cookie('token', newToken);
                            res.json({'error': null, 'content': 'connexion effectuée !'});
                        }).catch(reason => res.json({'error': 'Token pas set correctement' + reason}));
                    } else {
                        res.json({'error': "Nom d'utilisateur ou mot de passe incorrect !"});
                    }
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        }
    },


    register: (req, res) => {

        let reqFirstname = req.body.firstname;
        let reqLastname = req.body.lastname;
        let reqPassword = req.body.password;
        let reqPassword_bis = req.body.password_bis;
        let reqEmail = req.body.email;

        if (!reqFirstname || !reqLastname || !reqPassword || !reqPassword_bis || !reqEmail) {
            res.json({'error': 'Champs invalides !', 'content': null});
        } else {
            bcrypt.hash(reqPassword, 10, (err, hashPassword) => {
                DB.Compte.CreateUser(reqEmail, hashPassword, reqFirstname, reqLastname).then(() =>  {
                    res.json({'status': 'success', 'message': 'Votre compte à bien été créer'});
                }).catch(reason => res.json({'error': reason, 'content': null}));
            });
        }
    },

    getAccount: (req, res) => {
        let reqToken = req.cookies.token;

        if (!reqToken) {
            res.json({'error': "Vous n'êtes aps connecté !", 'content': null});
        } else {
            // Get user ID from token
            DB.Token.GetTokenTime(reqToken).then(date => {
                // Verify if token is expired (24H validity)
                if ((Date.now()-date) <= 3600*24*1000) {
                    // If token is VALID
                    // Get account ID associated with token
                    DB.Token.GetAccountFromToken(reqToken).then(id => {
                        // Get account data
                        DB.Compte.GetAccountFromId(id).then(account => {
                            // Success: send data to client
                            res.json({'error': null, 'content': account});
                        }).catch(reason => {
                            // Error: account data error
                            res.json({'error': reason.message, 'content': null});
                        });
                    }).catch(reason => {
                        // Error: account not found with token
                        res.json({'error': reason.message, 'content': null});
                    });
                } else {
                    // If token is EXPIRED
                    // Get user ID form token
                    DB.Compte.GetAccountFromToken(reqToken).then(id => {
                        // Delete the user's token
                        DB.Compte.SetToken(id, '').then(() => {
                            // Delete session token
                            res.clearCookie('token');
                            // Response: user need to reconnect
                            res.json({'error': 'Token expiré !', 'content': null});
                        }).catch(reason => {
                            // Deletion of token failed
                            res.json({'error': reason.message, 'content': null});
                        });
                    }).catch(reason => {
                        // User not found from token
                        res.json({'error': reason.message, 'content': null});
                    });
                }
            }).catch(reason => {
                // If token is invalid
                // Clear token in session
                res.clearCookie('token');
                // Error: send the error to client
                res.json({'error': reason.message, 'content': null});
            });
        }
    },

    disconnect: (req, res) => {
        let reqToken = req.cookies.token;
        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Compte.SetToken(id, '').then(() => {
                    res.clearCookie('token');
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Déconnexion impossible !', 'content': null});
        }
    },

    getRole: (req, res) => {
        let reqToken = req.cookies.token;
        if (reqToken) {
            DB.Role.GetRoleFromName('R_BDE').then(role => {
                DB.Token.GetAccountFromToken(reqToken).then(id => {
                    DB.Role.GetRolesIDFromUser(id).then((userRoles) => {
                        let items = userRoles.length;
                        let returned = [];
                        let error;
                        userRoles.forEach(a=>{
                            DB.Role.GetRoleFromID(a).then(role => {
                                returned.push(role);
                            }).catch(reason => {
                                error = true;
                            });
                            items--;
                            if (items===0) {
                                if (error) {
                                    res.json({'error': reason.message, 'content': null});
                                } else {
                                    res.json({'error': null, 'content': returned});
                                }
                            }
                        });
                    }).catch(reason => {
                        res.json({'error': reason.message, 'content': null});
                    });
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            });
        } else {
            res.json({'error': 'Pas connecté = pas role !', 'content': null});
        }
    }
};