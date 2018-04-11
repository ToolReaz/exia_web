module.exports = {
    /**
     * Crée un utilisateur et l'insère dans la base de données
     * @param {string} email Adresse E-Mail de l'utilisateur dont il faut créer le compte
     * @param {string} password Mot de passe (haché) de l'utilisateur dont il faut créer le compte
     * @param {string} firstname Prénom de l'utilisateur dont il faut créer le compte
     * @param {string} lastname Nom de l'utilisateur dont il faut créer le compte
     */
    CreateUser: (email, password, firstname, lastname) => {
        return new Promise((resolve, reject) => {
            Compte.findOrCreate({ where: { Adresse_Mail: email }, defaults: { Nom: lastname, Prenom: firstname, Mot_de_passe: password } })
                .then(r => {
                    if (r[1]) resolve(); else reject("L'utilisateur \"" + email + "\" existe déjà.");
                })
                .catch(err => { reject(err); });
        });
    },

    /**
     * Récupère le compte (brut) d'une personne
     * @param {string} email Adresse E-Mail de la personne dont il faut récupérer le compte
     */
    GetAccount: (email) => {
        return new Promise((resolve, reject) => {
            Compte.findOne({ where: { Adresse_Mail: email } })
                .then(r => {
                    if (r) resolve(r); else reject("L'utilisateur \"" + email + "\" n'existe pas.");
                })
                .catch(err => { reject(err); });
        });
    },

    /**
     * Récupère les données brutes liées au compte
     * @param {int} idAccount ID du compte
     */
    GetAccountFromId: (idAccount) => {
        return new Promise((resolve, reject) => {
            Compte.findOne({ where: { ID: idAccount } })
                .then(r => {
                    if (r) resolve(r); else reject("L'ID #" + idAccount + " n'existe pas.");
                })
                .catch(err => { reject(err); });;
        });
    },

    /**
     * Crée un token pour un utilisateur
     * @param {int} idCompte ID du compte associé au token
     * @param {string} token Token à insérer pour l'utilisateur spécifié
     */
    SetToken: (idAccount, token) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_CONNECT")
                .then(() => {
                    Session.upsert({ Token: token, Derniere_connexion: Date.now(), ID_Compte: idAccount })
                        .then(r => { resolve(r[1]); })
                        .catch(err => { reject(err); });
                })
                .catch(err => { reject(err); });
        });
    }
};