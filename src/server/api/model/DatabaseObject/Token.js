module.exports = (dataObject, permissions) => {

    return {

        /**
         * Return an account based on a token (after validating it with GetTokenTime)
         * @param {String} token Token of the account
         * @returns {Promise<Number>}
         * @constructor
         */
        GetAccountFromToken: async (token) => {
            let r = await dataObject.Session.findOne({where: {Token: token}});
            if (r) {
                let c = await dataObject.Account.findOne({where: {ID: r.ID_Account}});
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
            let r = await dataObject.Session.findOne({where: {Token: token}});
            if (r) {
                return new Date(r.LastConnection);
            } else {
                return Promise.reject(new Error("Le token \"" + token + "\" n'existe pas."));
            }
        },

        /**
         * Change the timestamp of a token
         * @param {String} token
         * @param {Date} timestamp Date of the timestamp
         * @returns {Promise<void>}
         * @constructor
         */
        SetTokenTimestamp: async (token, timestamp) => {
            await dataObject.Session.update({LastConnection: timestamp}, {where: {Token: token}});
        }
    };
};