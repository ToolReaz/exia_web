module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Crée une liaison entre un compte PayPal et un compte sur le site du BDE
         * @param {Number} idAccount ID du compte
         * @param {string} paypalApiKey Clé de l'API PayPal
         */
        SetPayPal: async (idAccount, paypalApiKey) => {
            var r = dataObject.Compte.findOne({ where: { ID: idAccount } });
            if (r) {
                await dataObject.Compte_PayPal.upsert({ GUID: paypalApiKey, ID_Compte: r.ID });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'existe pas."));
            }
        },

        /**
         * Récupère l'enregistrement de l'API de Paypal associée au compte
         * @param {Number} idAccount ID du compte
         * @returns {promise}
         */
        GetPayPalFromAccount: async (idAccount) => {
            return await dataObject.Compte_PayPal.findOne({ where: { ID_Compte: idAccount } });
        }

    };

    return here;
}