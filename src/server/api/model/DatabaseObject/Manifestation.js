module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Crée une manifestation
         * @param {string} name Nom de la manifestation à créer
         * @param {string} description Description de la manifestation à créer
         * @param {string} imagePath Chemin de l'image associée à la manifestation
         * @param {Date} date Date de la première (ou seule) occurence de la manifestation
         * @param {Number} interval_seconds Interval en secondes entre deux occurences de la manifestation (0 = pas de répétition)
         * @param {Number} price Prix de participation à la manifestation
         */
        CreateManifestation: (name, description, imagePath, date, interval_seconds, price) => {
            return {
                Nom: name,
                Description: description,
                Chemin_Image: imagePath,
                Quand: date,
                Intervale: interval_seconds,
                Prix: price,
                Public: false
            };
        },

        /**
         * Poste une manifestation
         * @param {number} idAccount ID du compte souhaitant créer directement une manif
         * @param {any} Manifestation Manifestation issue de CreateManifestation
         */
        PosteManifestation: (idAccount, Manifestation) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_VALID_MANIF").then(() => {
                    dataObject.Manifestation.findOrCreate({ where: Manifestation }).then(r => {
                        resolve();
                    }).catch(err => reject(err))

                }).catch(err => reject(err))

            });
        },

        /**
         * Inscrit une personne à une manif
         * @param {Number} idAccount ID du compte voulant s'inscrire à une manif
         * @param {Number} idManif ID de la manif
         * @returns {Promise<any>} Sans param
         */
        InscrireManif: (idAccount, idManif) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_PARTICIPE_MANIF").then(() => {
                    dataObject.Participe.findOrCreate({
                        where: {
                            ID: idAccount,
                            ID_Manifestation: idManif
                        }
                    }).then(r => {
                        resolve();
                    }).catch(err => reject(err))

                }).catch(err => reject(err))

            });
        },

        /**
         * Détermine si l'utilisateur participe à une manif
         * @param {Number} idAccount ID de l'utilisateur
         * @param {Number} idManif ID de la manif
         * @returns {Promise<boolean>} L'utilisateur participe à la manif
         */
        Participe: (idAccount, idManif) => {
            return new Promise((resolve, reject) => {
                dataObject.Participe.findOne({
                    where: {
                        ID: idAccount,
                        ID_Manifestation: idManif
                    }
                }).then(r => {
                    resolve(r == null);
                }).catch(err => reject(err))

            });
        },

        /**
         * retourne les évenements du mois (passés et futurs) et les répétitions d'anciens events
         */
        GetThisMonthEvents: () => {
            return new Promise((resolve, reject) => {
                dataObject.Manifestation.findAll().then(r => {
                    var events = [];
                    var items = r.length;
                    r.forEach(element => {
                        var interval = element.Intervale;
                        var dateInit = Date.now();
                        var year = new Date(Date.now()).getUTCFullYear();
                        var month = new Date(Date.now()).getUTCMonth();
                        var minDate = Date.UTC(year, month, 1, 0, 0, 0, 0);
                        var maxDate = Date.UTC(year, month + 1, 1, 0, 0, 0, 0) - 1;

                        if (dateInit > minDate &&
                            dateInit < maxDate ||
                            dateInit < minDate &&
                            Math.floor(minDate - dateInit / interval) < Math.floor(maxDate - dateInit / interval)) {
                            events.push(element);
                        }

                        items--;
                        if (items == 0) {
                            resolve(events);
                        }

                    });
                }).catch(err => reject(err))

            });
        },

        /**
         * Edite les données d'une manifestation
         * @param {Number} idManif ID de la manifestation
         * @param {string} name Nouveau nom de la manifestation (ou NULL)
         * @param {string} description Nouvelle description (ou NULL)
         * @param {string} imagePath Nouveau path vers l'image (ou NULL)
         * @param {Date} date Nouvelle date de début pour la manif (ou NULL)
         * @param {Number} timespan Nouvel interval entre deux répétitions de la manifestation (ou NULL)
         * @param {Number} price Nouveau prix pour la manifestation (ou NULL)
         * @param {boolean} public Si la manifestation est publique (visible sur la page) ou non (ou NULL)
         */
        EditManifestation: (idManif, name, description, imagePath, date, timespan, price, public) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_VALID_MANIF").then(() => {
                    var m = {};
                    if (name) m.Nom = name;
                    if (description) m.Description = description;
                    if (imagePath) m.Chemin_Image = imagePath;
                    if (date) m.Quand = date;
                    if (timespan) m.Intervale = timespan;
                    if (price) m.Prix = price;
                    if (public) m.Public = public;
                    dataObject.Manifestations.update(m, {
                        where: {
                            ID: idManif
                        }
                    }).then(r => resolve()).catch(err => reject(err))
                }).catch(err => reject(err))

            });
        },

        /**
         * Récupère l'ID de l'utilisateur ayant proposé la manif
         * @param {Number} idManif ID de la manif dont on cherche à déterminer l'auteur
         */
        GetManifestationAuthor: (idManif) => {
            return new Promise((resolve, reject) => {
                dataObject.Comprend.findOne({
                    where: {
                        ID: idManif
                    }
                }).then(r => {
                    if (r) {
                        dataObject.Idee.findOne({
                            where: {
                                ID: r.ID
                            }
                        }).then(s => {
                            if (s) {
                                resolve(s.ID_Compte);
                            } else {
                                reject(new Error("L'id de la manifestation #" + idManif + " n'a pas d'idée associée"));
                            }
                        }).catch(err => reject(err))

                    } else {
                        reject(new Error("L'id de la manifestation #" + idManif + " n'existe pas"));
                    }
                }).catch(err => reject(err))

            });
        },

        /**
         * Récupère la liste des personnes inscrites à un évènement
         * @param {Number} idAccount ID du compte de la personne souhaitant récupérer la liste des personnes inscrites
         * @param {Number} idManif ID de la manif dont il faut récupérer les participants
         */
        GetInscriptions: (idAccount, idManif) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_LISTE_INSCRITS").then(() => {
                    dataObject.Participe.findAll({
                        where: {
                            ID_Manifestation: idManif
                        }
                    }).then(r => resolve(r)).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        }
    };

    return here;
}