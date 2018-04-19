module.exports = (dataObject, permissions) => {

    return {

        /**
         * Create a manifestation
         * @param {String} name Name of the manifestation
         * @param {String} description Description of the manifestation
         * @param {String} imagePath Path to the image of the manifestation
         * @param {Date} date Date of the first time the event is happening
         * @param {Number} interval_seconds Time (in seconds) between two repetitions of the same event (or 0 if the event should not repeat)
         * @param {Number} price Price of the participation in the manifestation
         * @returns {{Name: String, Description: String, ImagePath: String, When: Date, TimeSpan: Number, Price: Number, Public: Boolean}}
         * @constructor
         */
        CreateManifestation: (name, description, imagePath, date, interval_seconds, price) => {
            return {
                Name: name,
                Description: description,
                ImagePath: imagePath,
                When: date,
                TimeSpan: interval_seconds,
                Price: price,
                Public: false
            };
        },

        /**
         * Post a single manifestation without an idea
         * @param {Number} idAccount ID of the account wanting to post the manifestation
         * @param {{Name: String, Description: String, ImagePath: String, When: Date, TimeSpan: Number, Price: Number, Public: Boolean}} manifestation Manifestation being added
         * @returns {Promise<Number>} ID of the manifestation
         * @constructor
         */
        PostManifestation: async (idAccount, manifestation) => {
            if (await permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                let r = await dataObject.Manifestation.findOrCreate({where: manifestation});
                return r.ID;
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_VALID_MANIF\""));
            }
        },

        /**
         * Enroll someone in the manifestation
         * @param {Number} idAccount ID of the user account wishing to be enrolled in the manifestation
         * @param {Number} idManifestation ID of the manifestation the user is being enrolled in
         * @returns {Promise<void>}
         * @constructor
         */
        EnrollManifestation: async (idAccount, idManifestation) => {
            if (permissions.FilterPermission(idAccount, "P_PARTICIPE_MANIF")) {
                await dataObject.Account_Manifestation.findOrCreate({
                    where: {
                        ID_Account: idAccount,
                        ID_Manifestation: idManifestation
                    }
                });
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
            return await dataObject.Account_Manifestation.findOne({
                where: {
                    ID_Account: idAccount,
                    ID_Manifestation: idManifestation
                }
            }) != null;
        },

        /**
         * Return the list of event for the current month
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetThisMonthEvents: async () => {
            let events = await dataObject.Manifestation.findAll();
            let dateInit = Date.now();
            let year = new Date(Date.now()).getUTCFullYear();
            let month = new Date(Date.now()).getUTCMonth();
            let minDate = Date.UTC(year, month, 1, 0, 0, 0, 0);
            let maxDate = Date.UTC(year, month + 1, 1, 0, 0, 0, 0) - 1;
            return events.filter(d =>
                dateInit > minDate &&
                dateInit < maxDate ||
                dateInit < minDate &&
                Math.floor(minDate - dateInit / d.TimeSpan) < Math.floor(maxDate - dateInit / d.TimeSpan)
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
         * @param {Boolean=} isPublic If the manifestation should be publicly visible
         * @returns {Promise<void>}
         * @constructor
         */
        EditManifestation: async (idAccount, idManifestation, name, description, imagePath, date, timeSpan, price, isPublic) => {
            if (permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                let m = {};
                if (name) m.Nom = name;
                if (description) m.Description = description;
                if (imagePath) m.Chemin_Image = imagePath;
                if (date) m.Quand = date;
                if (timeSpan) m.Intervale = timeSpan;
                if (price) m.Prix = price;
                if (isPublic) m.Public = isPublic;
                await dataObject.Manifestation.update(m, {where: {ID: idManifestation}});
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
            let r = await dataObject.Idea_Manifestation.findOne({where: {ID_Manifestation: idManifestation}});
            if (r) {
                let s = await dataObject.Idea.findOne({where: {ID: r.ID}});
                if (s) {
                    return s.ID;
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
                return await dataObject.Account_Manifestation.findAll({where: {ID_Manifestation: idManifestation}});
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
        },

        /**
         * Get a manifestation by its ID
         * @param idManifestation ID of the manifestation
         * @returns {Promise<Model>}
         * @constructor
         */
        GetManifestationFromID : async(idManifestation) => {
            return await dataObject.Manifestation.findOne({where: {ID: idManifestation}});
        },

        /**
         * Get every photos from a manifestation
         * @param idManifestation ID of the manifestation
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetPhotos: async(idManifestation) => {
            return await dataObject.Account_Manifestation_Photo.findAll({where: {ID_Manifestation: idManifestation}});
        }
    };
};