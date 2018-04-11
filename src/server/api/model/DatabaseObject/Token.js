module.exports = {
    /**     
     * Retourne un compte à partir d'un token (penser à vérifier la validité du token avec GetTokenTime)    
     * @param {string} token Token de connexion     
     */
    GetAccountFromToken: (token) => {
        return new Promise((resolve, reject) => {
            Session.findOne({
                where: {
                    Token: token
                }
            }).then(r => {
                if (r) {
                    Compte.findOne({
                        where: {
                            ID: r.ID
                        }
                    }).then(c => {
                        if (c) {
                            resolve(c.ID);
                        } else {
                            reject(new Error("Le token n'est apparement pas associé à une personne valide. ಠ_ಠ"));
                        }
                    }).catch(err => {
                        if (err) reject(err);
                    });
                } else {
                    reject(new Error("Le token \"" + token + "\" n'existe pas."));
                }
            }).catch(err => {
                if (err) reject(err);
            });
        });
    },
    /**     
     * Récupère le timestamp d'un token     
     * @param {string} token Token dont il faut récupérer le temps     
     */
    GetTokenTime: (token) => {
        return new Promise((resolve, reject) => {
            Session.findOne({
                where: {
                    Token: token
                }
            }).then(r => {
                if (r) resolve(r.Derniere_connexion);
                else reject(new Error("Le token \"" + token + "\" n'existe pas."));
            }).catch(err => {
                if (err) reject(err);
            });
        });
    },
    /**     
     * Change le timestamp d'un token     
     * @param {string} token Valeur du token     
     * @param {Date} timestamp Nouveau timestamp     
     */
    SetTokenTimestamp: (token, timestamp) => {
        return Session.update({
            Derniere_connexion: timestamp
        }, {
                where: {
                    Token: token
                }
            });
    }
};