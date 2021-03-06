module.exports = (dataObject, permissions) => {

    const here = {


        // TESTED

        /**
         * Get the role from the role ID
         * @param {Number} idRole ID of the role
         * @returns {Promise<Model>}
         * @constructor
         */
        GetRoleFromID: async (idRole) => {
            return await dataObject.Role.findOne({where: {ID: idRole}});
        },

        // TESTED

        /**
         * Return the role from the name of the role
         * @param {String} role Name of the role
         * @returns {Promise<Model>}
         * @constructor
         */
        GetRoleFromName: async (role) => {
            return await dataObject.Role.findOne({where: {RoleName: role}});
        },

        // TESTED

        /**
         * Return the roles ID of an user
         * @param {Number} idAccount ID of the user account
         * @returns {Array<Number>}
         * @constructor
         */
        GetRolesIDFromUser: async (idAccount) => {
            let r = await dataObject.Account_Role.findAll({where: {ID_Account: idAccount}});
            return r.map(d => d.ID_Role);
        },

        // TESTED

        /**
         * Return the roles of an user
         * @param {Number} idAccount ID of the user
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetRolesFromUser: async (idAccount) => {
            let r = await here.GetRolesIDFromUser(idAccount);
            let result = [];
            for (let i = 0; i < r.length; i++) {
                const element = r[i];
                result.push(await here.GetRoleFromID(element));
            }
            return result;
        },

        // TESTED

        /**
         * Add a role to an account
         * @param idAccount ID of the account
         * @param idRole ID of the role
         * @returns {Promise<void>}
         * @constructor
         */
        AddRole : async (idAccount, idRole) => {
            await dataObject.Account_Role.findOrCreate({where: {ID_Account: idAccount, ID_Role: idRole}});
        }

    };

    return here;
};