module.exports = (dataObject) => {
    var here = {

        /**
         * Filter request execution based on the permissions
         * @param {Number} userID ID of the user
         * @param {String} permission Name of the required permission
         * @returns {Promise<boolean>}
         * @constructor
         */
        FilterPermission: async (userID, permission) => {
            var r = await dataObject.Permission.findOne({ where: { Code_permission: permission } });
            var s = await dataObject.Permission_Role.findAll({ where: { ID: r.ID } });
            var t = await dataObject.Account.findOne({ where: { ID: userID } });
            var u = await dataObject.Account_Role.findAll({ where: { ID: t.ID } });

            return Contains(s, u, (s_) => {return s_.ID_Role;}, (u_) => {return u_.ID_Role;});
        },

        /**
         * Define user permissions
         * @param {String} role Role of the user
         * @param {String} permission Permission to add
         * @returns {Promise<void>}
         * @constructor
         */
        SetPermissions: async (role, permission) => {
            var r = await dataObject.Role.findOrCreate({ where: { Nom_role: role } });
            var s = await dataObject.Permission.findOrCreate({ where: { Code_permission: permission } });
            await dataObject.Permission_Role.findOrCreate({ where: { ID: s[0].ID, ID_Role: r[0].ID } });
        },

        /**
         * Setup basic permission system
         * @returns {Promise<void>}
         * @constructor
         */
        SetupPermissions: async () => {
            await here.SetPermissions("R_STUDENT", "P_CONNECT");
            await here.SetPermissions("R_STUDENT", "P_ADD_ACTIVITE");
            await here.SetPermissions("R_STUDENT", "P_LIST_ACTIVITE");
            await here.SetPermissions("R_STUDENT", "P_VOTE_IDEE");
            await here.SetPermissions("R_STUDENT", "P_ADD_PHOTO");
            await here.SetPermissions("R_STUDENT", "P_LIST_PHOTO");
            await here.SetPermissions("R_STUDENT", "P_LIKE_PHOTO");
            await here.SetPermissions("R_STUDENT", "P_COMMENT_PHOTO");
            await here.SetPermissions("R_STUDENT", "P_ADD_MANIF");
            await here.SetPermissions("R_STUDENT", "P_PARTICIPE_MANIF");
            await here.SetPermissions("R_BDE", "P_VALID_MANIF");
            await here.SetPermissions("R_BDE", "P_LISTE_INSCRITS");
            await here.SetPermissions("R_BDE", "P_COMMENT_LAST");
            await here.SetPermissions("R_BDE", "P_ADMIN_PHOTO");
            await here.SetPermissions("R_EXIA", "P_REPORT");
            await here.SetPermissions("R_EXIA", "P_DUMP_PHOTO");
            await here.SetPermissions("R_BDE", "P_ADD_SHOP");
            await here.SetPermissions("R_BDE", "P_SET_CATEGORIE_SHOP");
            await here.SetPermissions("R_BDE", "P_DELETE_SHOP");
            await here.SetPermissions("R_STUDENT", "P_PURCHASE_SHOP");
        }
    };
    return here;
};

/**
 * Check if two members of a table are the same after a transformation
 * @param {Array} arrayLeft First array
 * @param {Array} arrayRight Second array
 * @param {Function} transformLeft Transformation applied to the first array
 * @param {Function} transformRight Transformation applied to the second array
 * @returns {boolean}
 * @constructor
 */
function Contains(arrayLeft, arrayRight, transformLeft, transformRight) {
    var ret = false;
    var transformedLeft = arrayLeft.map(d => transformLeft(d));
    var transformedRight = arrayRight.map(d => transformRight(d));
    transformedLeft.forEach(entityLeft => {
        transformedRight.forEach(entityRight => {
            ret |= entityRight === entityLeft;
        });
    });
    return ret;
}