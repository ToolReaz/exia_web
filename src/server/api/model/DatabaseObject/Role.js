module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Retourne le role à partir de l'ID du role
         * @param {Number} idRole ID du role
         */
        GetRoleFromID: (idRole) => {
            return dataObject.Role.findOne({where: {ID: idRole}});
        },

        /**
         * Retourne le role à partir du nom du role
         * @param {Number} idRole nom du role
         */
        GetRoleFromName: (role) => {
            return dataObject.Role.findOne({where: {Nom_role: role}});
        },

        /**
         * Retourne les IDs des roles d'un utilisateur
         * @param {Number} idAccount ID du compte utilisateur
         * @returns {Promise<Number>}
         */
        GetRolesIDFromUser: (idAccount) => {
            return new Promise((resolve, reject)=>{
                dataObject.Appartient.findAll({where: {ID: idAccount}}).then(r=>{
                    resolve(r.map(d=>{
                        return d.ID_Role;
                    }));
                }).catch(err=>{if(err)reject(err);});
            });
        }

    };

    return here;
}