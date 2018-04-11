module.exports = {
    /**
     * Récupère l'ensemble des idées
     * @param {callback} callback Callback (1 param : ensemble des idées)
     */
    GetAllIdeas: (callback) => {
        Idee.findAll().then(r => {
            callback(r);
        });
    },
    /**
     * Crée une idée et l'insère dans la base de données
     * @param {int} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
     * @param {string} title Titre de l'idée
     * @param {string} text Texte/Description de l'idée
     * @param {array} manifestationArray Liste de manifestation obtenue par CreateManifestation
     * @param {callback} callback Callback (aucun param) retourné une fois l'insertion dans la base de données terminée
     */
    CreateIdea: (idAccount, title, text, manifestationArray, callback) => {
        require('../Permission/Permissions').FilterPermission(idAccount, "P_ADD_ACTIVITE", (ok) => {
            if (ok) {
                Idee.findOrCreate({ where: { Titre: title, Texte: text }, defaults: { Soumis_le: Date.now(), ID_Compte: idAccount, Approuve: false } }).then(r => {
                    var idIdee = r[0].ID;
                    var done = [].fill(false, 0, manifestationArray.length);
                    for (let i = 0; i < manifestationArray.length; i++) {
                        Manifestation.findOrCreate({ where: manifestationArray[i] }).then(s => {
                            Comprend.findOrCreate({ where: { ID: r.ID, ID_Manifestation: s.ID } }).then(t => {
                                done[i] = true;
                                if (AND(done)) { callback(); }
                            });
                        });
                    }
                });
            }
        });
    },
    /**
     * Vote pour une idée
     * @param {int} idAccount ID du compte ayant voté
     * @param {int} idIdea ID de l'idée votée
     * @param {boolean} vote Valeur du vote
     * @param {callback} callback Callback (pas de param)
     */
    VoteIdea: (idAccount, idIdea, vote, callback) => {
        FilterPermission(idAccount, "P_VOTE_IDEE", (ok) => {
            if (ok) {
                Vote.findOrCreate({ where: { ID: idAccount, ID_Idee: idIdea }, defaults: { Pour: vote } });
            }
        });
    }
};