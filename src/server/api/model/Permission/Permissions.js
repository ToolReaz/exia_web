module.exports = (dataObject) => {
    var here = {

        /**     
         * Filtre les executions de requête en fonction des permissions     
         * @param {Number} userID ID de l'utilisateur executant la requête     
         * @param {String} permission Permission requise pour executer la requête     
         */
        FilterPermission: async (userID, permission) => {
            var r = await dataObject.Permission.findOne({ where: { Code_permission: permission } });
            var s = await dataObject.Possede.findAll({ where: { ID: r.ID } });
            var t = await dataObject.Compte.findOne({ where: { ID: userID } });
            var u = await dataObject.Appartient.findAll({ where: { ID: t.ID } });

            return Contains(s, u, (s_) => s_.ID_Role, (u_) => u_.ID_Role);
        },

        /**     
         * Définit les permissions     
         * @param {String} role Nom du role     
         * @param {String} permission Nom de la permission     
         */
        SetPermissions: async (role, permission) => {
            var r = await dataObject.Role.findOrCreate({ where: { Nom_role: role } });
            var s = await dataObject.Permission.findOrCreate({ where: { Code_permission: permission } });
            await dataObject.Possede.findOrCreate({ where: { ID: s[0].ID, ID_Role: r[0].ID } });
        },

        /**     
         * Met les permissions de base     
         */
        SetupPermissions: async () => {
            await here.SetPermissions("R_STUDENT", "P_CONNECT")
            await here.SetPermissions("R_STUDENT", "P_ADD_ACTIVITE")
            await here.SetPermissions("R_STUDENT", "P_LIST_ACTIVITE")
            await here.SetPermissions("R_STUDENT", "P_VOTE_IDEE")
            await here.SetPermissions("R_STUDENT", "P_ADD_PHOTO")
            await here.SetPermissions("R_STUDENT", "P_LIST_PHOTO")
            await here.SetPermissions("R_STUDENT", "P_LIKE_PHOTO")
            await here.SetPermissions("R_STUDENT", "P_COMMENT_PHOTO")
            await here.SetPermissions("R_STUDENT", "P_ADD_MANIF")
            await here.SetPermissions("R_STUDENT", "P_PARTICIPE_MANIF")
            await here.SetPermissions("R_BDE", "P_VALID_MANIF")
            await here.SetPermissions("R_BDE", "P_LISTE_INSCRITS")
            await here.SetPermissions("R_BDE", "P_COMMENT_LAST")
            await here.SetPermissions("R_BDE", "P_ADMIN_PHOTO")
            await here.SetPermissions("R_EXIA", "P_REPORT")
            await here.SetPermissions("R_EXIA", "P_DUMP_PHOTO")
            await here.SetPermissions("R_BDE", "P_ADD_SHOP")
            await here.SetPermissions("R_BDE", "P_SET_CATEGORIE_SHOP")
            await here.SetPermissions("R_BDE", "P_DELETE_SHOP")
            await here.SetPermissions("R_STUDENT", "P_PURCHASE_SHOP")
        }
    };
    return here;
}

/**     
 * Détermine si deux membres de deux tableaux différents sont identiques     
 * @param {Array} arrayLeft Premier tableau     
 * @param {Array} arrayRight Deuxième tableau     
 * @param {} transformLeft Transformée à appliquer au premier tableau     
 * @param {} transformRight Transformée à appliquer au deuxième tableau     
 */
function Contains(arrayLeft, arrayRight, transformLeft, transformRight) {
    var ret = false;
    var transformedLeft = arrayLeft.map(d => transformLeft(d));
    var transformedRight = arrayRight.map(d => transformedRight(d));
    transformedLeft.forEach(entityLeft => {
        transformedRight.forEach(entityRight => {
            ret |= tRight == tLeft;
        });
    });
    return ret;
}