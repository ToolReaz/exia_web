module.exports = {


    /**
     * Crée une liaison entre un compte PayPal et un compte sur le site du BDE
     * @param {int} idAccount ID du compte
     * @param {string} paypalApiKey Clé de l'API PayPal
     */
    SetPayPal: (idAccount, paypalApiKey) => {
        return new Promise((resolve, reject) => {
            Compte.findOne({ where: { ID: idAccount } }).then(r => {
                if (r) {
                    Compte_PayPal.findOrCreate({ where: { GUID: paypalApiKey, ID_Compte: r.ID } }).then(s => {
                        resolve();
                    });
                } else {
                    reject("L'utilisateur #" + idAccount + " n'existe pas.");
                }
            });
        });
    },

    /**
     * Récupère la clé de l'API de Paypal associée au compte
     * @param {int} idAccount ID du compte
     */
    GetPayPalFromAccount: (idAccount) => {
        return new Promise((resolve, reject) => {
            Compte_PayPal.findOne({ where: { ID_Compte: idAccount } }).then(r => {
                resolve(r.GUID);
            });
        });
    }

};