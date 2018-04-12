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

    getAccount: (res, req) => {
        let reqToken = req.cookies.token;
        console.log('tete');
        if (reqToken) {
            DB.Compte.GetAccountFromToken(reqToken).then(account => {
                console.log(account);
                res.json({'error': null, 'content': account});
            }).catch(reason => {
                res.json({'error': reason, 'content': null});
            });
        } else {
            res.json({'error': "Vous n'êtes aps connecté !", 'content': null});
        }
    }
};