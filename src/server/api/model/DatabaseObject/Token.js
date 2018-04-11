module.exports = {
    
    /**
     * Retourne un compte à partir d'un token (penser à vérifier la validité du token avec GetTokenTime)
     * @param {string} token Token de connexion
     * @param {callback} callback Callback (param 1 : ID du compte)
     */
    GetAccountFromToken: (token, callback) => {
        Session.findOne({ where: { Token: token } }).then(r => {
            Compte.findOne({ where: { ID: r.ID } }).then(c => {
                callback(c.ID);
            });
        });
    },

    /**
     * Récupère le timestamp d'un token
     * @param {string} token Token dont il faut récupérer le temps
     * @param {callback} callback Callback (param 1 : timestamp du token)
     */
    GetTokenTime: (token, callback) => {
        Session.findOne({ where: { Token: token } }).then(r => {
            callback(r.Derniere_connexion);
        });
    },

    /**
     * Change le timestamp d'un token
     * @param {string} token Valeur du token
     * @param {Date} timestamp Nouveau timestamp
     * @param {callback} callback Callback (0 param)
     */
    SetTokenTimestamp: (token, timestamp, callback) => {
        Session.update({ Derniere_connexion: timestamp }, { where: { Token: token } }).then(r => {
            callback()
        });
    }
};