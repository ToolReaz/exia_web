module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Retourne le role à partir de l'ID du role
         * @param {Number} idRole ID du role
         * @returns {promise}
         */
        GetRoleFromID: (idRole) => {
            return dataObject.Role.findOne({where: {ID: idRole}});
        },

        /**
         * Retourne le role à partir du nom du role
         * @param {Number} idRole nom du role
         * @returns {promise}
         */
        GetRoleFromName: (role) => {
            return dataObject.Role.findOne({where: {Nom_role: role}});
        },

        /**
         * Retourne les IDs des roles d'un utilisateur
         * @param {Number} idAccount ID du compte utilisateur
         * @returns {Promise<number[]>}
         */
        GetRolesIDFromUser: (idAccount) => {
            return new Promise((resolve, reject)=>{
                dataObject.Appartient.findAll({where: {ID: idAccount}}).then(r=>{
                    resolve(r.map(d=>{
                        return d.ID_Role;
                    }));
                }).catch(err => reject(err));
            });
        },

        /**
         * Retourne les roles associés à un utilisateur
         * @param {number} idAccount ID du compte utilisateur
         * @returns {Promise}
         */
        GetRolesFromUser: (idAccount) => {
            return new Promise((resolve, reject) => {
                here.GetRolesIDFromUser(idAccount).then(r=>{
                    var l = r.length;
                    var output = [];
                    r.forEach(d=>{
                        here.GetRoleFromID(d).then(s=>{
                            output.push(s);
                            l--;
                            if(l==0){
                                resolve(output);
                            }
                        }).catch(err => reject(err));
                    });
                }).catch(err => reject(err));
            });
        }

    };

    return here;
}