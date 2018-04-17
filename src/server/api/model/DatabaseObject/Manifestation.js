module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Create a manifestation
         * @param {String} name Name of the manifestation
         * @param {String} description Description of the manifestation
         * @param {String} imagePath Path to the image of the manifestation
         * @param {Date} date Date of the first time the event is happening
         * @param {Number} interval_seconds Time (in seconds) between two repetitions of the same event (or 0 if the event should not repeat)
         * @param {Number} price Price of the participation in the manifestation
         * @returns {{Nom: String, Description: String, Chemin_Image: String, Quand: Date, Intervale: Number, Prix: Number, Public: Boolean}}
         * @constructor
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
         * Post a single manifestation without an idea
         * @param {Number} idAccount ID of the account wanting to post the manifestation
         * @param {{Nom: String, Description: String, Chemin_Image: String, Quand: Date, Intervale: Number, Prix: Number, Public: Boolean}} manifestation Manifestation being added
         * @returns {Promise<Number>} ID of the manifestation
         * @constructor
         */
        PostManifestation: async (idAccount, manifestation) => {
            if (await permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                var r = await dataObject.Manifestation.findOrCreate({ where: manifestation });
                return r.ID;
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_VALID_MANIF\""));
            }
        },

        /**
         * Enroll someone in the manifestation
         * @param {Number} idAccount ID of the user account wishing to be enrolled in the manifestation
         * @param {Number} idManifestation ID of the manifestation the user is being enrolled in
         * @returns {Promise<never>}
         * @constructor
         */
        EnrollManifestation: async (idAccount, idManifestation) => {
            if (permissions.FilterPermission(idAccount, "P_PARTICIPE_MANIF")) {
                await dataObject.Account_Manifestation.findOrCreate({ where: { ID: idAccount, ID_Manifestation: idManifestation } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_PARTICIPE_MANIF\""));
            }
        },

        /**
         * Check if an user is enrolled in a manifestation
         * @param {Number} idAccount ID of the user account
         * @param {Number} idManifestation ID of the manifestation
         * @returns {Promise<boolean>}
         * @constructor
         */
        IsUserEnrolled: async (idAccount, idManifestation) => {
            return await dataObject.Account_Manifestation.findOne({ where: { ID: idAccount, ID_Manifestation: idManifestation } }) == null;
        },

        /**
         * Return the list of event for the current month
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetThisMonthEvents: async () => {
            var events = await dataObject.Manifestation.findAll();
            var dateInit = Date.now();
            var year = new Date(Date.now()).getUTCFullYear();
            var month = new Date(Date.now()).getUTCMonth();
            var minDate = Date.UTC(year, month, 1, 0, 0, 0, 0);
            var maxDate = Date.UTC(year, month + 1, 1, 0, 0, 0, 0) - 1;
            return events.filter(d=>
                dateInit > minDate &&
                dateInit < maxDate ||
                dateInit < minDate &&
                Math.floor(minDate - dateInit / d.Intervale) < Math.floor(maxDate - dateInit / d.Intervale)
            );
        },

        /**
         * Edit a manifestation
         * @param {Number} idAccount ID of the user account wishing to edit a manifestation
         * @param {Number} idManifestation ID of the manifestation
         * @param {String=} name Name of the manifestation
         * @param {String=} description Description of the manifestation
         * @param {String=} imagePath Path to the manifestation picture
         * @param {Date=} date Date of the first time the event should happen
         * @param {Number=} timeSpan Time (in seconds) between two repetitions of the manifestation
         * @param {Number=} price Price of the manifestation
         * @param {Boolean=} public If the manifestation should be publicly visible
         * @returns {Promise<never>}
         * @constructor
         */
        EditManifestation: async (idAccount, idManifestation, name, description, imagePath, date, timeSpan, price, public) => {
            if (permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                var m = {};
                if (name) m.Nom = name;
                if (description) m.Description = description;
                if (imagePath) m.Chemin_Image = imagePath;
                if (date) m.Quand = date;
                if (timeSpan) m.Intervale = timeSpan;
                if (price) m.Prix = price;
                if (public) m.Public = public;
                await dataObject.Manifestation.update(m, { where: { ID: idManifestation } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_PARTICIPE_MANIF\""));
            }
        },

        /**
         * Get the ID of the user who posted the manifestation
         * @param {Number} idManifestation ID of the manifestation
         * @returns {Promise<Number>}
         * @constructor
         */
        GetManifestationAuthor: async (idManifestation) => {
            var r = await dataObject.Idea_Manifestation.findOne({ where: { ID: idManifestation } });
            if (r) {
                var s = await dataObject.Idea.findOne({ where: { ID: r.ID } });
                if (s) {
                    return s.ID_Compte;
                } else {
                    return Promise.reject(new Error("The manifestation #" + idManifestation + " does not have an idea related"));
                }
            } else {
                return Promise.reject(new Error("The manifestation #" + idManifestation + " does not exist"));
            }
        },

        /**
         * Get the list of participant in the manifestation
         * @param {Number} idAccount ID of the account wishing to get the dump
         * @param {Number} idManifestation ID of the manifestation
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetInscriptions: async (idAccount, idManifestation) => {
            if (await permissions.FilterPermission(idAccount, "P_LISTE_INSCRITS")) {
                return await dataObject.Account_Manifestation.findAll({ where: { ID_Manifestation: idManifestation } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_LISTE_INSCRITS\""));
            }
        },

        /**
         * Get every manifestation
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetAllManifestations: async () => {
            return await dataObject.Manifestation.findAll();
        }
    };

    return here;
};