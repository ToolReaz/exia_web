module.exports = (dataObject) => {
    var here = {
        /**     
         * Détermine si deux membres de deux tableaux différents sont identiques     
         * @param {array} arrayLeft Premier tableau     
         * @param {array} arrayRight Deuxième tableau     
         * @param {callback} transformLeft Transformée à appliquer au premier tableau     
         * @param {callback} transformRight Transformée à appliquer au deuxième tableau     
         */
        Contains: (arrayLeft, arrayRight, transformLeft, transformRight) => {
            var ret = false;
            arrayLeft.forEach(entityLeft => {
                var tLeft = transformLeft(entityLeft);
                arrayRight.forEach(entityRight => {
                    var tRight = transformRight(entityRight);
                    ret |= tRight == tLeft;
                });
            });
            return ret;
        },
        /**     
         * Filtre les executions de requête en fonction des permissions     
         * @param {int} userID ID de l'utilisateur executant la requête     
         * @param {string} permission Permission requise pour executer la requête     
         */
        FilterPermission: (userID, permission) => {
            return new Promise((resolve, reject) => {
                dataObject.Permission.findOne({
                    where: {
                        Code_permission: permission
                    }
                }).then(r => {
                    dataObject.Possede.findAll({
                        where: {
                            ID: r.ID
                        }
                    }).then(s => {
                        dataObject.Compte.findOne({
                            where: {
                                ID: userID
                            }
                        }).then(t => {
                            dataObject.Appartient.findAll({
                                where: {
                                    ID: t.ID
                                }
                            }).then(u => {
                                if (here.Contains(s, u, (s_) => {
                                    return s_.ID_Role;
                                }, (u_) => {
                                    return u_.ID_Role
                                })) {
                                    resolve()
                                } else {
                                    reject('Permission insuffisante : permission ' + permission + ' requise.')
                                }
                            }).catch(err => reject(err))
                        }).catch(err => reject(err))
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },
        /**     
         * Définit les permissions     
         * @param {string} role Nom du role     
         * @param {string} permission Nom de la permission     
         */
        SetPermissions: (role, permission) => {
            return new Promise((resolve, reject) => {
                dataObject.Role.findOrCreate({
                    where: {
                        Nom_role: role
                    }
                }).then(r => {
                    dataObject.Permission.findOrCreate({
                        where: {
                            Code_permission: permission
                        }
                    }).then(s => {
                        dataObject.Possede.findOrCreate({
                            where: {
                                ID: s[0].ID,
                                ID_Role: r[0].ID
                            }
                        }).then(resolve()).catch(err => reject(err))
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },
        /**     
         * Met les permissions de base     
         */
        SetupPermissions: async () => {
            await here.SetPermissions("R_STUDENT", "P_CONNECT") //done
            await here.SetPermissions("R_STUDENT", "P_ADD_ACTIVITE") //done
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