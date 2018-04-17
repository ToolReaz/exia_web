module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Gather every idea stored in the database
         * @param {Number} idAccount ID of the user account requesting the dump
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetAllIdeas: async (idAccount) => {
            if (await permissions.FilterPermission(idAccount, "P_LIST_ACTIVITE")) {
                return await dataObject.Idea.findAll();
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_LIST_ACTIVITE\""));
            }
        },

        /**
         * Create an idea and insert it in the database
         * @param {Number} idAccount ID of the user account proposing the idea
         * @param {String} title Title of the idea
         * @param {String} text Description of the idea
         * @param {Array} manifestationArray Array of manifestation related to this idea
         * @returns {Promise<Number>} The ID of the inserted idea
         * @constructor
         */
        CreateIdea: async (idAccount, title, text, manifestationArray) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_ACTIVITE")) {
                let r = dataObject.Idea.findOrCreate({ where: { Titre: title, Texte: text }, defaults: { Soumis_le: Date.now(), ID_Compte: idAccount, Approuve: false } });
                if (manifestationArray != null) {
                    for (let i = 0; i < manifestationArray.length; i++) {
                        const manifestation = manifestationArray[i];
                        let s = await dataObject.Manifestation.findOrCreate({ where: manifestation });
                        let t = await dataObject.Idea_Manifestation.findOrCreate({ where: { ID: r[0].ID, ID_Manifestation: s[0].ID } });
                        return t.ID;
                    }
                }
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_ADD_ACTIVITE\""));
            }
        },

        /**
         * Vote for an idea
         * @param {Number} idAccount ID of the user account voting
         * @param {Number} idIdea ID of the idea voted
         * @param {Boolean} vote True : For, False : Against
         * @returns {Promise<never>}
         * @constructor
         */
        VoteIdea: async (idAccount, idIdea, vote) => {
            if (await permissions.FilterPermission(idAccount, "P_VOTE_IDEE")) {
                await dataObject.Vote.findOrCreate({ where: { ID: idAccount, ID_Idee: idIdea }, defaults: { Pour: vote } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_VOTE_IDEE\""));
            }
        },

        /**
         * Validate an idea
         * @param {Number} idAccount ID of the user account validating the idea
         * @param {Number} idIdea ID of the idea being validated
         * @returns {Promise<never>}
         * @constructor
         */
        ValidateIdea: async (idAccount, idIdea) => {
            if (permissions.FilterPermission(idAccount, "P_VALID_MANIF")) {
                await dataObject.Idea.update({ Approuve: true }, { where: { ID: idIdea } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_VALID_MANIF\""));
            }
        },

        /**
         * Return the amount of vote for an idea
         * @param {Number} idIdea ID of the idea
         * @returns {Promise<Number>}
         * @constructor
         */
        GetVoteForCount: async (idIdea) => {
            return await dataObject.Vote.count({ where: { Pour: true, ID_Idee: idIdea } });
        },

        /**
         * Return the amount of vote against an idea
         * @param {Number} idIdea ID of the idea
         * @returns {Promise<Number>}
         * @constructor
         */
        GetVoteAgainstCount: async (idIdea) => {
            return await dataObject.Vote.count({ where: { Pour: false, ID_Idee: idIdea } });
        },

        /**
         * Return the idea based on the provided ID
         * @param idIdea ID of the idea
         * @returns {Promise<Model>}
         * @constructor
         */
        GetIdeaFromId: async (idIdea) => {
            return await dataObject.Idea.findOne({where: {ID: idIdea}});
        }

    };

    return here;
};