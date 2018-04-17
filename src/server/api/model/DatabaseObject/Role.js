module.exports = (dataObject, permissions) => {

    var here = {


        /**
         * Get the role from the role ID
         * @param {Number} idRole ID of the role
         * @returns {Promise<Model>}
         * @constructor
         */
        GetRoleFromID: async (idRole) => {
            return await dataObject.Role.findOne({ where: { ID: idRole } });
        },

        /**
         * Return the role from the name of the role
         * @param {String} role Name of the role
         * @returns {Promise<Model>}
         * @constructor
         */
        GetRoleFromName: async (role) => {
            return await dataObject.Role.findOne({ where: { Nom_role: role } });
        },

        /**
         * Return the roles ID of an user
         * @param {Number} idAccount ID of the user account
         * @returns {Promise<(Possede.ID_Role|{type, allowNull, primaryKey, references}|Appartient.ID_Role)[]>}
         * @constructor
         */
        GetRolesIDFromUser: async (idAccount) => {
            var r = await dataObject.Account_Role.findAll({ where: { ID: idAccount } });
            return r.map(d => d.ID_Role);
        },

        /**
         * Return the roles of an user
         * @param {Number} idAccount ID of the user
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetRolesFromUser: async (idAccount) => {
            var r = await here.GetRolesIDFromUser(idAccount);
            var result = [];
            for (let i = 0; i < r.length; i++) {
                const element = r[i];
                result.push(await here.GetRoleFromID(element.ID));
            }
            return result;
        },

    };

    return here;
};