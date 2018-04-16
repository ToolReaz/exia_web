module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Récupère l'ensemble des idées
         * @param {number} idAccount ID du compte
         * @returns {Promise} Les idées
         */
        GetAllIdeas: (idAccount) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_LIST_ACTIVITE").then(() => {
                    dataObject.Idee.findAll().then(r => {
                        resolve(r);
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },

        /**
         * Crée une idée et l'insère dans la base de données
         * @param {Number} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
         * @param {string} title Titre de l'idée
         * @param {string} text Texte/Description de l'idée
         * @param {array} manifestationArray Liste de manifestation obtenue par CreateManifestation
         */
        CreateIdea: (idAccount, title, text, manifestationArray) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_ADD_ACTIVITE").then(() => {
                    dataObject.Idee.findOrCreate({
                        where: {
                            Titre: title,
                            Texte: text
                        },
                        defaults: {
                            Soumis_le: Date.now(),
                            ID_Compte: idAccount,
                            Approuve: false
                        }
                    }).then(r => {
                        var idIdee = r[0].ID;
                        var done = [].fill(false, 0, manifestationArray.length);
                        if (manifestationArray == null) resolve();
                        else {
                            for (let i = 0; i < manifestationArray.length; i++) {
                                dataObject.Manifestation.findOrCreate({
                                    where: manifestationArray[i]
                                }).then(s => {
                                    dataObject.Comprend.findOrCreate({
                                        where: {
                                            ID: r[0].ID,
                                            ID_Manifestation: s.ID
                                        }
                                    }).then(t => {
                                        done[i] = true;
                                        if (this.AND(done)) {
                                            resolve();
                                        }
                                    });
                                });
                            }
                        }
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },

        /**
         * Vote pour une idée
         * @param {Number} idAccount ID du compte ayant voté
         * @param {Number} idIdea ID de l'idée votée
         * @param {boolean} vote Valeur du vote
         */
        VoteIdea: (idAccount, idIdea, vote) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_VOTE_IDEE").then(() => {
                    dataObject.Vote.findOrCreate({
                        where: {
                            ID: idAccount,
                            ID_Idee: idIdea
                        },
                        defaults: {
                            Pour: vote
                        }
                    }).then(r => resolve()).catch(err => reject(err))
                }).catch(err => reject(err))
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
        },

        /**
         * Valide une idée
         * @param {Number} idAccount ID de l'utilisateur
         * @param {Number} idIdee ID de l'idée
         */
        ValideIdee: (idAccount, idIdee) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_VALID_MANIF").then(() => {
                    dataObject.Idee.update({
                        Approuve: true
                    }, {
                            where: {
                                ID: idIdee
                            }
                        }).then(r => resolve()).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },

        /**
         * Récupère le nombre de vote pour une idée
         * @param {Number} idIdee ID de la idée dont il faut récupérer le nombre de vote favorable
         * @returns {Number}
         */
        GetVoteForCount: (idIdee) => {
            return dataObject.Vote.count({
                where: {
                    Pour: true,
                    ID_Idee: idIdee
                }
            });
        },

        /**
         * Récupère le nombre de vote contre une idée
         * @param {Number} idIdee ID de la idée dont il faut récupérer le nombre de vote défavorable
         * @returns {Number}
         */
        GetVoteAgainstCount: (idIdee) => {
            return dataObject.Vote.count({
                where: {
                    Pour: false,
                    ID_Idee: idIdee
                }
            });
        }
    };

    return here;
}