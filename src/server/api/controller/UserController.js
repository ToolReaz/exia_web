const DB = require('../model/DB');
let bcrypt = require('bcrypt');

module.exports = {

    connect: (req, res) => {

        let reqEmail = req.body.email;""
        let reqPassword = req.body.password;

        if (!reqEmail || !reqPassword) {
            res.json({'error': 'Pseudo ou mot de passe invalide !'});
        } else {
            DB.GetAccount(reqEmail, (result) => {
                if (result!=null && result.dataValues!=null) {
                    let dbPassword = result.dataValues.Mot_de_passe;
                    bcrypt.compare(reqPassword, dbPassword, (err, ok) => {
                        if (ok) {
                            let newToken = require('crypto').randomBytes(64).toString('hex');
                            //result.updateAttributes({token: newToken, online: true, last_login: Date.now()}).then(() => {
                                res.cookie('token', newToken);
                                res.json({'error': null, 'token': newToken});
                            //});
                        }  else {
                            res.json({'error':  "Nom d'utilisateur ou mot de passe incorrect !"});
                        }
                    });
                } else {
                    res.json({'error': "Nom d'utilisateur ou mot de passe incorrect !"});
                }
            });
        }
    },


    register: (req, res) => {

        let reqFirstname = req.body.firstname;
        let reqLastname = req.body.lastname;
        let reqPassword = req.body.password;
        let reqPassword_bis = req.body.password_bis;
        let reqEmail = req.body.email;

        console.log(req.body);

        if (!reqFirstname || !reqLastname || !reqPassword || !reqPassword_bis || !reqEmail) {
            res.json({'error': 'Champs invalides !'});
        } else {
            bcrypt.hash(reqPassword, 10, (err, hashPassword) => {
                DB.CreateUser(reqEmail, hashPassword, reqFirstname, reqLastname, (callback) =>  {
                    if (callback) {
                        res.json({'status': 'success', 'message': 'Votre compte à bien été créer ! Vérifier vos mails.'});
                    } else {
                        res.json({'status': 'error', 'message': "Adress mail ou nom d'utilisateur déja pris !"});
                    }
                });
            });
        }
    }
};