module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Crée une manifestation
         * @param {String} name Nom de la manifestation à créer
         * @param {String} description Description de la manifestation à créer
         * @param {String} imagePath Chemin de l'image associée à la manifestation
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
         * @param {Number} idAccount ID du compte souhaitant créer directement une manif
         * @param {any} Manifestation Manifestation issue de CreateManifestation
         */
        PosteManifestation: async (idAccount, Manifestation) => {
            if (await permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                await dataObject.Manifestation.findOrCreate({ where: Manifestation });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_VALID_MANIF\""));
            }
        },

        /**
         * Inscrit une personne à une manif
         * @param {Number} idAccount ID du compte voulant s'inscrire à une manif
         * @param {Number} idManif ID de la manif
         */
        InscrireManif: async (idAccount, idManif) => {
            if (permissions.FilterPermission(idAccount, "P_PARTICIPE_MANIF")) {
                await dataObject.Participe.findOrCreate({ where: { ID: idAccount, ID_Manifestation: idManif } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_PARTICIPE_MANIF\""));
            }
        },

        /**
         * Détermine si l'utilisateur participe à une manif
         * @param {Number} idAccount ID de l'utilisateur
         * @param {Number} idManif ID de la manif
         */
        Participe: async (idAccount, idManif) => {
            return await dataObject.Participe.findOne({ where: { ID: idAccount, ID_Manifestation: idManif } }) == null;
        },

        /**
         * retourne les évenements du mois (passés et futurs) et les répétitions d'anciens events
         */
        GetThisMonthEvents: async () => {
            var r = await dataObject.Manifestation.findAll();
            var dateInit = Date.now();
            var year = new Date(Date.now()).getUTCFullYear();
            var month = new Date(Date.now()).getUTCMonth();
            var minDate = Date.UTC(year, month, 1, 0, 0, 0, 0);
            var maxDate = Date.UTC(year, month + 1, 1, 0, 0, 0, 0) - 1;
            return events.filter(d=>
                dateInit > minDate &&
                dateInit < maxDate ||
                dateInit < minDate &&
                Math.floor(minDate - dateInit / element.Intervale) < Math.floor(maxDate - dateInit / element.Intervale)
            );
        },

        /**
         * Edite les données d'une manifestation
         * @param {Number} idAccount ID de la personne souhaitant ajouter la manif
         * @param {Number} idManif ID de la manifestation
         * @param {String=} name Nouveau nom de la manifestation (ou NULL)
         * @param {String=} description Nouvelle description (ou NULL)
         * @param {String=} imagePath Nouveau path vers l'image (ou NULL)
         * @param {Date=} date Nouvelle date de début pour la manif (ou NULL)
         * @param {Number=} timespan Nouvel interval entre deux répétitions de la manifestation (ou NULL)
         * @param {Number=} price Nouveau prix pour la manifestation (ou NULL)
         * @param {Boolean=} public Si la manifestation est publique (visible sur la page) ou non (ou NULL)
         */
        EditManifestation: async (idAccount, idManif, name, description, imagePath, date, timespan, price, public) => {
            if (permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                var m = {};
                if (name) m.Nom = name;
                if (description) m.Description = description;
                if (imagePath) m.Chemin_Image = imagePath;
                if (date) m.Quand = date;
                if (timespan) m.Intervale = timespan;
                if (price) m.Prix = price;
                if (public) m.Public = public;
                await dataObject.Manifestation.update(m, { where: { ID: idManif } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_PARTICIPE_MANIF\""));
            }
        },

        /**
         * Récupère l'ID de l'utilisateur ayant proposé la manif
         * @param {Number} idManif ID de la manif dont on cherche à déterminer l'auteur
         */
        GetManifestationAuthor: async (idManif) => {
            var r = await dataObject.Comprend.findOne({ where: { ID: idManif } });
            if (r) {
                var s = await dataObject.Idee.findOne({ where: { ID: r.ID } });
                if (s) {
                    return s.ID_Compte;
                } else {
                    return Promise.reject(new Error("L'id de la manifestation #" + idManif + " n'a pas d'idée associée"));
                }
            } else {
                return Promise.reject(new Error("L'id de la manifestation #" + idManif + " n'existe pas"));
            }
        },

        /**
         * Récupère la liste des personnes inscrites à un évènement
         * @param {Number} idAccount ID du compte de la personne souhaitant récupérer la liste des personnes inscrites
         * @param {Number} idManif ID de la manif dont il faut récupérer les participants
         */
        GetInscriptions: async (idAccount, idManif) => {
            if (await permissions.FilterPermission(idAccount, "P_LISTE_INSCRITS")) {
                return await dataObject.Participe.findAll({ where: { ID_Manifestation: idManif } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_LISTE_INSCRITS\""));
            }
        },

        /**
         * Retourne toutes les manifestations
         */
        GetAllManifestations: async () => {
            return await dataObject.Manifestation.findAll();
        }
    };

    return here;
}