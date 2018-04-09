const db = require('../db');
let bcrypt = require('bcrypt');

module.exports = {

    connect: (req, res) => {

        let reqUsername = req.body.username;
        let reqPassword = req.body.password;

        if (!reqUsername || !reqPassword) {
            console.log(req.body);
            res.json({'error': 'Pseudo ou mot de passe invalide !'});
        } else {
            db.sequelize.model('Users').find({where:{username: reqUsername}}).then((result) => {
                console.log(result);
                if (result!=null && result.dataValues!=null) {
                    let dbPassword = result.dataValues.password;
                    bcrypt.compare(reqPassword, dbPassword, (err, ok) => {
                        if (ok) {
                            let newToken = require('crypto').randomBytes(64).toString('hex');
                            result.updateAttributes({token: newToken, online: true, last_login: Date.now()}).then(() => {
                                req.session.token = newToken;
                                res.json({status: 'connected', token: newToken, user: result.dataValues.username});
                            });
                        }  else {
                            res.json({'status': 'error', 'message': "Nom d'utilisateur ou mot de passe incorrect !"});
                        }
                    });
                } else {
                    res.json({'status': 'error', 'message': "Nom d'utilisateur ou mot de passe incorrect !"});
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
            db.sequelize.model('Compte').find({where: {Adresse_Mail: reqEmail}}).then((result) => {
                if (result == null) {
                    bcrypt.hash(reqPassword, 10, (err, hashPassword) => {
                        console.log(hashPassword);
                        db.sequelize.model('Compte').create({Nom: reqLastname, Prenom: reqFirstname, Mot_de_passe: hashPassword, Adresse_Mail: reqEmail}).then(() => {
                            res.json({'status': 'success', 'message': 'Votre compte à bien été créer ! Vérifier vos mails.'});
                        })
                    });
                } else {
                    res.json({'status': 'error', 'message': "Adress mail ou nom d'utilisateur déja pris !"});
                }
            });
        }
    }
};