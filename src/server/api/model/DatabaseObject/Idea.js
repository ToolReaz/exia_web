module.exports = {
    /**
     * Récupère l'ensemble des idées
     */
    GetAllIdeas: () => {
        return new Promise((resolve, reject) => {
            Idee.findAll().then(r => {
                resolve(r);
            });
        });
    },
    /**
     * Crée une idée et l'insère dans la base de données
     * @param {int} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
     * @param {string} title Titre de l'idée
     * @param {string} text Texte/Description de l'idée
     * @param {array} manifestationArray Liste de manifestation obtenue par CreateManifestation
     */
    CreateIdea: (idAccount, title, text, manifestationArray) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_ADD_ACTIVITE").then((ok) => {
                if (ok) {
                    Idee.findOrCreate({ where: { Titre: title, Texte: text }, defaults: { Soumis_le: Date.now(), ID_Compte: idAccount, Approuve: false } }).then(r => {
                        var idIdee = r[0].ID;
                        var done = [].fill(false, 0, manifestationArray.length);
                        for (let i = 0; i < manifestationArray.length; i++) {
                            Manifestation.findOrCreate({ where: manifestationArray[i] }).then(s => {
                                Comprend.findOrCreate({ where: { ID: r.ID, ID_Manifestation: s.ID } }).then(t => {
                                    done[i] = true;
                                    if (this.AND(done)) { resolve(); }
                                });
                            });
                        }
                    });
                }
            });
        });
    },
    /**
     * Vote pour une idée
     * @param {int} idAccount ID du compte ayant voté
     * @param {int} idIdea ID de l'idée votée
     * @param {boolean} vote Valeur du vote
     */
    VoteIdea: (idAccount, idIdea, vote) => {
        return new Promise((resolve, reject) => {
            FilterPermission(idAccount, "P_VOTE_IDEE", (ok) => {
                if (ok) {
                    Vote.findOrCreate({ where: { ID: idAccount, ID_Idee: idIdea }, defaults: { Pour: vote } }).then(r => {
                        resolve();
                    });
                }
            });
        });
    },
    /**
     * Calcule un ET logique sur un tableau
     * @param {boolean[]} array Tableau de boolean dont il faut calculer le ET
     */
    AND: (array) => {
        var out = true;
        array.forEach(element => {
            out &= element;
        });
        return out;
    }
};