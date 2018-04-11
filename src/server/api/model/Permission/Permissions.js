module.exports = {
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
            Permission.findOne({
                where: {
                    Code_permission: permission
                }
            }).then(r => {
                Possede.findAll({
                    where: {
                        ID: r.ID
                    }
                }).then(s => {
                    Compte.findOne({
                        where: {
                            ID: userID
                        }
                    }).then(t => {
                        Appartient.findAll({
                            where: {
                                ID: t.ID
                            }
                        }).then(u => {
                            if (this.Contains(s, u, (s_) => {
                                return s_.ID_Role;
                            }, (u_) => {
                                return u_.ID_Role
                            })) {
                                resolve()
                            } else {
                                reject('Permission insuffisante : permission ' + permission + ' requise.')
                            }
                        }).catch(err => {
                            { if (err) reject(err); }
                        });
                    }).catch(err => {
                        { if (err) reject(err); }
                    });
                }).catch(err => {
                    { if (err) reject(err); }
                });
            }).catch(err => {
                { if (err) reject(err); }
            });
        });
    },
    /**     
     * Définit les permissions     
     * @param {string} role Nom du role     
     * @param {string} permission Nom de la permission     
     */
    SetPermissions: (role, permission) => {
        return new Promise((resolve, reject) => {
            Role.findOrCreate({
                where: {
                    Nom_role: role
                }
            }).then(r => {
                Permission.findOrCreate({
                    where: {
                        Code_permission: permission
                    }
                }).then(s => {
                    Possede.findOrCreate({
                        where: {
                            ID: s[0].ID,
                            ID_Role: r[0].ID
                        }
                    }).then(resolve()).catch(err => {
                        if (err) reject(err);
                    });
                }).catch(err => {
                    if (err) reject(err);
                });
            }).catch(err => {
                if (err) reject(err);
            });
        });
    },
    /**     
     * Met les permissions de base     
     */
    SetupPermissions: () => {
        SetPermissions("R_STUDENT", "P_CONNECT", () => { }); //done
        SetPermissions("R_STUDENT", "P_ADD_ACTIVITE", () => { }); //done
        SetPermissions("R_STUDENT", "P_LIST_ACTIVITE", () => { });
        SetPermissions("R_STUDENT", "P_VOTE_IDEE", () => { });
        SetPermissions("R_STUDENT", "P_ADD_PHOTO", () => { });
        SetPermissions("R_STUDENT", "P_LIST_PHOTO", () => { });
        SetPermissions("R_STUDENT", "P_LIKE_PHOTO", () => { });
        SetPermissions("R_STUDENT", "P_COMMENT_PHOTO", () => { });
        SetPermissions("R_STUDENT", "P_ADD_MANIF", () => { });
        SetPermissions("R_STUDENT", "P_PARTICIPE_MANIF", () => { });
        SetPermissions("R_BDE", "P_VALID_MANIF", () => { });
        SetPermissions("R_BDE", "P_LISTE_INSCRITS", () => { });
        SetPermissions("R_BDE", "P_COMMENT_LAST", () => { });
        SetPermissions("R_BDE", "P_ADMIN_PHOTO", () => { });
        SetPermissions("R_EXIA", "P_REPORT", () => { });
        SetPermissions("R_EXIA", "P_DUMP_PHOTO", () => { });
        SetPermissions("R_BDE", "P_ADD_SHOP", () => { });
        SetPermissions("R_BDE", "P_DELETE_SHOP", () => { });
        SetPermissions("R_STUDENT", "P_PURCHASE_SHOP", () => { });
    }
};