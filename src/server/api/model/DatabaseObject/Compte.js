module.exports = {
    /**
     * Crée un utilisateur et l'insère dans la base de données
     * @param {string} email Adresse E-Mail de l'utilisateur dont il faut créer le compte
     * @param {string} password Mot de passe (haché) de l'utilisateur dont il faut créer le compte
     * @param {string} firstname Prénom de l'utilisateur dont il faut créer le compte
     * @param {string} lastname Nom de l'utilisateur dont il faut créer le compte
     * @param {Callback} callback Callback selon si l'utilisateur existe (false) ou non (true)
     */
    CreateUser: (email, password, firstname, lastname, callback) => {
        Compte.findOrCreate({ where: { Adresse_Mail: email }, defaults: { Nom: lastname, Prenom: firstname, Mot_de_passe: password } }).then(r => {
            callback(r[1]); // r[1] si l'utilisateur n'existe pas, !r[1] si il existe
        });
    },

    /**
     * Récupère le compte (brut) d'une personne
     * @param {string} email Adresse E-Mail de la personne dont il faut récupérer le compte
     * @param {delegate} callback Callback dont le premier parametre est la réponse de la base de données
     */
    GetAccount: (email, callback) => {
        Compte.findOne({ where: { Adresse_Mail: email } }).then(r => {
            callback(r);
        });
    },

    /**
     * Récupère les données brutes liées au compte
     * @param {int} idAccount ID du compte
     * @param {callback} callback Callback (param 1 : compte)
     */
    GetAccountFromId: (idAccount, callback) => {
        Compte.findOne({ where: { ID: idAccount } }).then(r => {
            callback(r);
        });
    },
    
    /**
     * Crée un token pour un utilisateur
     * @param {int} idCompte ID du compte associé au token
     * @param {string} token Token à insérer pour l'utilisateur spécifié
     * @param {callback} callback Callback (1 param : True si le token n'existait pas, False si le token existait déjà)
     */
    SetToken: (idAccount, token, callback) => {
        require('../Permission/Permissions').FilterPermission(idAccount, "P_CONNECT", (ok) => {
            if (ok) {
                Session.findOrCreate({ where: { Token: token }, defaults: { Derniere_connexion: Date.now(), ID_Compte: idAccount } }).then(r => {
                    callback(r[1]);
                });
            }
        });
    }
};