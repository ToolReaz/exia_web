module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Récupère l'ensemble des idées
         * @param {Number} idAccount ID du compte
         */
        GetAllIdeas: async (idAccount) => {
            if (await permissions.FilterPermission(idAccount, "P_LIST_ACTIVITE")) {
                return await dataObject.Idee.findAll();
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_LIST_ACTIVITE\""));
            }
        },

        /**
         * Crée une idée et l'insère dans la base de données
         * @param {Number} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
         * @param {String} title Titre de l'idée
         * @param {String} text Texte/Description de l'idée
         * @param {Array} manifestationArray Liste de manifestation obtenue par CreateManifestation
         */
        CreateIdea: async (idAccount, title, text, manifestationArray) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_ACTIVITE")) {
                var r = dataObject.Idee.findOrCreate({ where: { Titre: title, Texte: text }, defaults: { Soumis_le: Date.now(), ID_Compte: idAccount, Approuve: false } });
                if (manifestationArray != null) {
                    for (let i = 0; i < manifestationArray.length; i++) {
                        const manifestation = manifestationArray[i];
                        var s = await dataObject.Manifestation.findOrCreate({ where: manifestation });
                        var t = await dataObject.Comprend.findOrCreate({ where: { ID: r[0].ID, ID_Manifestation: s[0].ID } });
                    }
                }
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_ADD_ACTIVITE\""));
            }
        },

        /**
         * Vote pour une idée
         * @param {Number} idAccount ID du compte ayant voté
         * @param {Number} idIdea ID de l'idée votée
         * @param {Boolean} vote Valeur du vote
         */
        VoteIdea: async (idAccount, idIdea, vote) => {
            if (await permissions.FilterPermission(idAccount, "P_VOTE_IDEE")) {
                await dataObject.Vote.findOrCreate({ where: { ID: idAccount, ID_Idee: idIdea }, defaults: { Pour: vote } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_VOTE_IDEE\""));
            }
        },

        /**
         * Valide une idée
         * @param {Number} idAccount ID de l'utilisateur
         * @param {Number} idIdee ID de l'idée
         */
        ValideIdee: async (idAccount, idIdee) => {
            if (permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                await dataObject.Idee.update({ Approuve: true }, { where: { ID: idIdee } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_VALID_MANIF\""));
            }
        },

        /**
         * Récupère le nombre de vote pour une idée
         * @param {Number} idIdee ID de la idée dont il faut récupérer le nombre de vote favorable
         */
        GetVoteForCount: async (idIdee) => {
            return await dataObject.Vote.count({ where: { Pour: true, ID_Idee: idIdee } });
        },

        /**
         * Récupère le nombre de vote contre une idée
         * @param {Number} idIdee ID de la idée dont il faut récupérer le nombre de vote défavorable
         */
        GetVoteAgainstCount: async (idIdee) => {
            return await dataObject.vote.count({ where: { Pour: false, ID_Idee: idIdee } });
        },

    };

    return here;
}