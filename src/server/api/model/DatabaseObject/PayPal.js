module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Crée une liaison entre un compte PayPal et un compte sur le site du BDE
         * @param {int} idAccount ID du compte
         * @param {string} paypalApiKey Clé de l'API PayPal
         */
        SetPayPal: (idAccount, paypalApiKey) => {
            return new Promise((resolve, reject) => {
                dataObject.Compte.findOne({
                    where: {
                        ID: idAccount
                    }
                }).then(r => {
                    if (r) {
                        dataObject.Compte_PayPal.upsert({
                            GUID: paypalApiKey,
                            ID_Compte: r.ID
                        }).then(s => {
                            resolve();
                        }).catch(err => {
                            if (err) reject(err);
                        });
                    } else {
                        reject(new Error("L'utilisateur #" + idAccount + " n'existe pas."));
                    }
                }).catch(err => {
                    if (err) reject(err);
                });
            });
        },

        /**
         * Récupère l'enregistrement de l'API de Paypal associée au compte
         * @param {int} idAccount ID du compte
         */
        GetPayPalFromAccount: (idAccount) => {
            return dataObject.Compte_PayPal.findOne({
                where: {
                    ID_Compte: idAccount
                }
            });
        }
    };

    return here;
}