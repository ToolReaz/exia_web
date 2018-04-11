module.exports = {

    /**
     * Crée une liaison entre un compte PayPal et un compte sur le site du BDE
     * @param {int} idAccount ID du compte
     * @param {string} paypalApiKey Clé de l'API PayPal
     * @param {callback} callback Callback (true : succès, false : l'utilisateur n'existe pas)
     */
    SetPayPal: (idAccount, paypalApiKey, callback) => {
        Compte.findOne({ where: { ID: idAccount } }).then(r => {
            if (r) {
                Compte_PayPal.findOrCreate({ where: { GUID: paypalApiKey, ID_Compte: r.ID } }).then(s => {
                    callback(true);
                });
            } else {
                callback(false);
            }
        })
    },

    /**
     * Récupère la clé de l'API de Paypal associée au compte
     * @param {int} idAccount ID du compte
     * @param {callback} callback Callback (param 1 : compte paypal)
     */
    GetPayPalFromAccount: (idAccount, callback) => {
        Compte_PayPal.findOne({ where: { ID_Compte: idAccount } }).then(r => {
            callback(r.GUID);
        });
    }
    
};