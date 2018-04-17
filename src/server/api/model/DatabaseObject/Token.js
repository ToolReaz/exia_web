module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Return an account based on a token (after validating it with GetTokenTime)
         * @param {String} token Token of the account
         * @returns {Promise<Number>}
         * @constructor
         */
        GetAccountFromToken: async (token) => {
            var r = await dataObject.Session.findOne({ where: { Token: token } });
            if (r) {
                var c = await dataObject.Account.findOne({ where: { ID: r.ID_Compte } });
                if (c) {
                    return c.ID;
                } else {
                    return Promise.reject(new Error("Le token n'est apparement pas associé à une personne valide. ಠ_ಠ"));
                }
            } else {
                return Promise.reject(new Error("Le token \"" + token + "\" n'existe pas."));
            }
        },

        /**
         * Return the timestamp of a token
         * @param {String} token Value of the token
         * @returns {Promise<Date>}
         * @constructor
         */
        GetTokenTime: async (token) => {
            var r = await dataObject.Session.findOne({ where: { Token: token } });
            if (r) {
                return new Date(r.Derniere_connexion);
            } else {
                return Promise.reject(new Error("Le token \"" + token + "\" n'existe pas."));
            }
        },

        /**
         * Change le timestamp d'un token
         * @param {String} token Valeur du token
         * @param {Date} timestamp Nouveau timestamp
         */

        /**
         * Change the timestamp of a token
         * @param {String} token
         * @param {Date} timestamp Date of the timestamp
         * @returns {Promise<never>}
         * @constructor
         */
        SetTokenTimestamp: async (token, timestamp) => {
            await dataObject.Session.update({ Derniere_connexion: timestamp }, { where: { Token: token } });
        }
    };

    return here;
};