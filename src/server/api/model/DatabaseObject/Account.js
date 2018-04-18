module.exports = (dataObject, permissions) => {

    var here = {

        //TESTED

        /**
         * Create an user and insert it in the database
         * @param {String} email Email address of the account
         * @param {String} password Password of the account
         * @param {String} firstName First name of the account owner
         * @param {String} lastName Last name of the account owner
         * @returns {Promise<Number>} The ID of the account
         * @constructor
         */
        CreateUser: async (email, password, firstName, lastName) => {
            let r = await dataObject.Account.findOrCreate({
                where: {Mail: email},
                defaults: {LastName: lastName, FirstName: firstName, Password: password}
            });
            if (!r[1]) return Promise.reject(new Error("The user with the following email address : \"" + email + "\" already exists."));
            else return r[0].ID;
        },

        // TESTED

        /**
         * Find the raw account of an user
         * @param {String} email Email address of the account
         * @returns {Promise<Model>}
         * @constructor
         */
        GetAccount: async (email) => {
            let r = await dataObject.Account.findOne({where: {Mail: email}});
            if (r) return r;
            else return Promise.reject(new Error("The user with the following email address : \"" + email + "\" does not exist."));
        },

        // TESTED

        /**
         * Find the raw account of an user
         * @param {Number} idAccount ID of the account in the database
         * @returns {Promise<Model>}
         * @constructor
         */
        GetAccountFromId: async (idAccount) => {
            let r = await dataObject.Account.findOne({where: {ID: idAccount}});
            if (r) return r;
            else return Promise.reject(new Error("The user with the following ID : \"" + idAccount + "\" does not exist."));
        },

        // TESTED

        /**
         * Create a token for an user
         * @param {Number} idAccount ID of the user account
         * @param {String=} token Token for this account
         * @returns {Promise<void>}
         * @constructor
         */
        SetToken: async (idAccount, token) => {
            if (await permissions.FilterPermission(idAccount, "P_CONNECT")) {
                if (token) {
                    await dataObject.Session.upsert({ Token: token, LastConnection: Date.now(), ID_Account: idAccount });
                } else {
                    await dataObject.Session.destroy({ where: { ID: idAccount } });
                }
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_CONNECT\""));
            }
        },

        /**
         * Find the list of manifestation where the user take part
         * @param {Number} idAccount ID of the user account
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        InscriptionList: async (idAccount) => {
            return await dataObject.Account_Manifestation.findAll({ where: { ID: idAccount } });
        }
    };

    return here;
};