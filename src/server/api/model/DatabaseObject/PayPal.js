module.exports = (dataObject, permissions) => {

    return {

        /**
         * Create a link between an account and a PayPal API key
         * @param {Number} idAccount ID of the account
         * @param {String} payPalApiKey Value of the PayPal API key
         * @returns {Promise<Number>} The ID of the inserted key
         * @constructor
         */
        SetPayPal: async (idAccount, payPalApiKey) => {
            let r = dataObject.Account.findOne({where: {ID: idAccount}});
            if (r) {
                let s = await dataObject.PayPalAccount.upsert({GUID: payPalApiKey, ID: r.ID});
                return s.ID;
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not exist."));
            }
        },

        /**
         * Find the PayPal key belonging to a user
         * @param idAccount ID of the user account
         * @returns {Promise<Model>}
         * @constructor
         */
        GetPayPalFromAccount: async (idAccount) => {
            return await dataObject.PayPalAccount.findOne({where: {ID: idAccount}});
        }

    };
};