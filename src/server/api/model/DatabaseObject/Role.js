module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Retourne le role à partir de l'ID du role
         * @param {Number} idRole ID du role
         */
        GetRoleFromID: async (idRole) => {
            return await dataObject.Role.findOne({ where: { ID: idRole } });
        },

        /**
         * Retourne le role à partir du nom du role
         * @param {Number} idRole nom du role
         */
        GetRoleFromName: async (role) => {
            return await dataObject.Role.findOne({ where: { Nom_role: role } });
        },

        /**
         * Retourne les IDs des roles d'un utilisateur
         * @param {Number} idAccount ID du compte utilisateur
         */
        GetRolesIDFromUser: async (idAccount) => {
            var r = await dataObject.Appartient.findAll({ where: { ID: idAccount } });
            return r.map(d => d.ID_Role);
        },

        /**
         * Retourne les roles associés à un utilisateur
         * @param {Number} idAccount ID du compte utilisateur
         */
        GetRolesFromUser: async (idAccount) => {
            var r = await here.GetRolesIDFromUser(idAccount);
            var result = [];
            for (let i = 0; i < r.length; i++) {
                const element = r[i];
                result.push(await here.GetRoleFromID(element));
            }
            return result;
        },

    };

    return here;
}