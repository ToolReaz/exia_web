module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Retourne un compte à partir d'un token (penser à vérifier la validité du token avec GetTokenTime)
         * @param {String} token Token de connexion
         */
        GetAccountFromToken: async (token) => {
            var r = await dataObject.Session.findOne({ where: { Token: token } });
            if (r) {
                var c = await dataObject.Compte.findOne({ where: { ID: r.ID_Compte } });
                if (c) {
                    return c.ID;
                } else {
                    Promise.reject(new Error("Le token n'est apparement pas associé à une personne valide. ಠ_ಠ"));
                }
            } else {
                Promise.reject(new Error("Le token \"" + token + "\" n'existe pas."));
            }
        },

        /**
         * Récupère le timestamp d'un token
         * @param {String} token Token dont il faut récupérer le temps
         */
        GetTokenTime: async (token) => {
            var r = await dataObject.Session.findOne({ where: { Token: token } });
            if (r) {
                return new Date(r.Derniere_connexion);
            } else {
                Promise.reject(new Error("Le token \"" + token + "\" n'existe pas."));
            }
        },

        /**
         * Change le timestamp d'un token
         * @param {String} token Valeur du token
         * @param {Date} timestamp Nouveau timestamp
         */
        SetTokenTimestamp: async (token, timestamp) => {
            return await dataObject.Session.update({ Derniere_connexion: timestamp }, { where: { Token: token } });
        }
    };

    return here;
}