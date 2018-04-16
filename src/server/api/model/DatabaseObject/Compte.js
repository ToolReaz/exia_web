module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Crée un utilisateur et l'insère dans la base de données
         * @param {string} email Adresse E-Mail de l'utilisateur dont il faut créer le compte
         * @param {string} password Mot de passe (haché) de l'utilisateur dont il faut créer le compte
         * @param {string} firstname Prénom de l'utilisateur dont il faut créer le compte
         * @param {string} lastname Nom de l'utilisateur dont il faut créer le compte
         */
        CreateUser: async(email, password, firstname, lastname) => {
            var r = await dataObject.Compte.findOrCreate({
                where: { Adresse_Mail: email },
                defaults: { Nom: lastname, Prenom: firstname, Mot_de_passe: password }
            });
            if (r[1]) return;
            else Promise.reject(new Error("L'utilisateur \"" + email + "\" existe déjà."));
        },

        /**
         * Récupère le compte (brut) d'une personne
         * @param {string} email Adresse E-Mail de la personne dont il faut récupérer le compte
         */
        GetAccount: async(email) => {
            var r = await dataObject.Compte.findOne({ where: { Adresse_Mail: email } });
            if (r) return r;
            else Promise.reject(new Error("L'utilisateur \"" + email + "\" n'existe pas."));
        },

        /**
         * Récupère les données brutes liées au compte
         * @param {number} idAccount ID du compte
         */
        GetAccountFromId: async(idAccount) => {
            var r = await dataObject.Compte.findOne({ where: { ID: idAccount } });
            if (r) return r;
            else Promise.reject(new Error("L'ID #" + idAccount + " n'existe pas."));
        },

        /**
         * Crée un token pour un utilisateur
         * @param {number} idCompte ID du compte associé au token
         * @param {string=} token Token à insérer pour l'utilisateur spécifié
         */
        SetToken: async(idAccount, token) => {
            if (await permissions.FilterPermission(idAccount, "P_CONNECT")) {
                if (token) {
                    await dataObject.Session.upsert({ Token: token, Derniere_connexion: Date.now(), ID_Compte: idAccount })
                } else {
                    await dataObject.Session.destroy({ where: { ID_Compte: idAccount } })
                }
                return;
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_CONNECT\""));
            }
        },

        /**
         * Récupère l'ensemble des manifestations auxquelles l'utilisateur participe
         * @param {Number} idAccount ID de l'utilisateur
         * @returns {promise}
         */
        ListeInscriptions: async(idAccount) => {
            return await dataObject.Participe.findAll({ where: { ID: idAccount } });
        },
    };

    return here;
}