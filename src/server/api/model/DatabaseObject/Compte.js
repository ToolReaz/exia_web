module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Crée un utilisateur et l'insère dans la base de données
         * @param {string} email Adresse E-Mail de l'utilisateur dont il faut créer le compte
         * @param {string} password Mot de passe (haché) de l'utilisateur dont il faut créer le compte
         * @param {string} firstname Prénom de l'utilisateur dont il faut créer le compte
         * @param {string} lastname Nom de l'utilisateur dont il faut créer le compte
         */
        CreateUser: (email, password, firstname, lastname) => {
            return new Promise((resolve, reject) => {
                dataObject.Compte.findOrCreate({
                    where: {
                        Adresse_Mail: email
                    },
                    defaults: {
                        Nom: lastname,
                        Prenom: firstname,
                        Mot_de_passe: password
                    }
                }).then(r => {
                    if (r[1]) resolve();
                    else reject(new Error("L'utilisateur \"" + email + "\" existe déjà."));
                }).catch(err => {
                    if (err) reject(err);
                });
            });
        },

        /**
         * Récupère le compte (brut) d'une personne
         * @param {string} email Adresse E-Mail de la personne dont il faut récupérer le compte
         */
        GetAccount: (email) => {
            return new Promise((resolve, reject) => {
                dataObject.Compte.findOne({
                    where: {
                        Adresse_Mail: email
                    }
                }).then(r => {
                    if (r) resolve(r);
                    else reject(new Error("L'utilisateur \"" + email + "\" n'existe pas."));
                }).catch(err => {
                    if (err) reject(err);
                });
            });
        },

        /**
         * Récupère les données brutes liées au compte
         * @param {Number} idAccount ID du compte
         */
        GetAccountFromId: (idAccount) => {
            return new Promise((resolve, reject) => {
                dataObject.Compte.findOne({
                    where: {
                        ID: idAccount
                    }
                }).then(r => {
                    if (r) resolve(r);
                    else reject(new Error("L'ID #" + idAccount + " n'existe pas."));
                }).catch(err => {
                    if (err) reject(err);
                });
            });
        },

        /**
         * Crée un token pour un utilisateur
         * @param {Number} idCompte ID du compte associé au token
         * @param {string} token Token à insérer pour l'utilisateur spécifié
         */
        SetToken: (idAccount, token) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_CONNECT").then(() => {
                    dataObject.Session.upsert({
                        Token: token,
                        Derniere_connexion: Date.now(),
                        ID_Compte: idAccount
                    }).then(r => {
                        resolve(r[1]);
                    }).catch(err => {
                        if (err) reject(err);
                    });
                }).catch(err => {
                    if (err) reject(err);
                });
            });
        },

        /**
         * Récupère l'ensemble des manifestations auxquelles l'utilisateur participe
         * @param {Number} idAccount ID de l'utilisateur
         * @returns {promise}
         */
        ListeInscriptions: (idAccount) => {
            return dataObject.Participe.findAll({
                where: {
                    ID: idAccount
                }
            });
        }
    };

    return here;
}