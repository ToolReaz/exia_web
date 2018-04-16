module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Récupère l'ensemble des idées
         * @param {number} idAccount ID du compte
         * @returns {Promise} Les idées
         */
        GetAllIdeas: async(idAccount) => {
            if (await permissions.FilterPermission(idAccount, "P_LIST_ACTIVITE")) {
                return await dataObject.Idee.findAll();
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_LIST_ACTIVITE\""));
            }
        },

        /**
         * Crée une idée et l'insère dans la base de données
         * @param {Number} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
         * @param {string} title Titre de l'idée
         * @param {string} text Texte/Description de l'idée
         * @param {array} manifestationArray Liste de manifestation obtenue par CreateManifestation
         */
        CreateIdea: async(idAccount, title, text, manifestationArray) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_ACTIVITE")) {
                var r = dataObject.Idee.findOrCreate({
                    where: { Titre: title, Texte: text },
                    defaults: { Soumis_le: Date.now(), ID_Compte: idAccount, Approuve: false }
                });
                var idIdee = r[0].ID;
                var done = manifestationArray.length;
                if (manifestationArray == null) return;
                for (let i = 0; i < manifestationArray.length; i++) {
                    done--;
                    var s = await dataObject.Manifestation.findOrCreate({ where: manifestationArray[i] });
                    var t = await dataObject.Comprend.findOrCreate({ where: { ID: r[0].ID, ID_Manifestation: s[0].ID } });
                    if (done == 0) { return; }
                }
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_ADD_ACTIVITE\""));
            }
        },

        /**
         * Vote pour une idée
         * @param {Number} idAccount ID du compte ayant voté
         * @param {Number} idIdea ID de l'idée votée
         * @param {boolean} vote Valeur du vote
         */
        VoteIdea: async(idAccount, idIdea, vote) => {
            if (await permissions.FilterPermission(idAccount, "P_VOTE_IDEE")) {
                await dataObject.Vote.findOrCreate({
                    where: { ID: idAccount, ID_Idee: idIdea },
                    defaults: { Pour: vote }
                });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_VOTE_IDEE\""));
            }
        },

        /**
         * Valide une idée
         * @param {Number} idAccount ID de l'utilisateur
         * @param {Number} idIdee ID de l'idée
         */
        ValideIdee: async(idAccount, idIdee) => {
            if (permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                await dataObject.Idee.update({ Approuve: true }, { where: { ID: idIdee } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_VALID_MANIF\""));
            }
        },

        /**
         * Récupère le nombre de vote pour une idée
         * @param {Number} idIdee ID de la idée dont il faut récupérer le nombre de vote favorable
         */
        GetVoteForCount: async(idIdee) => {
            return await dataObject.Vote.count({ where: { Pour: true, ID_Idee: idIdee } });
        },

        /**
         * Récupère le nombre de vote contre une idée
         * @param {Number} idIdee ID de la idée dont il faut récupérer le nombre de vote défavorable
         * @returns {Number}
         */
        GetVoteAgainstCount: async(idIdee) => {
            return await dataObject.vote.count({ where: { Pour: false, ID_Idee: idIdee } });
        },

    };

    return here;
}