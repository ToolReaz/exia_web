module.exports = (dataObject, permissions) => {

    return {

        /**
         * Ajoute une photo à une manif
         * SUSPECT
         * TODO
         * @param {Number} idAccount ID du compte souhaitant uploader l'image
         * @param {String} photoPath Path de l'image
         * @param {Number} idManif ID de la manifestation
         */
        AddPhoto: async (idAccount, photoPath, idManif) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_PHOTO")) {
                let r = await dataObject.Photo.findOrCreate({
                    where: {ImagePath: photoPath},
                    defaults: {Public: false}
                });
                await dataObject.Account_Manifestation_Photo.findOrCreate({
                    where: {
                        ID_Photo: r.ID,
                        ID_Manifestation: idManif,
                        ID: idAccount
                    }
                });
                let t = await dataObject.Account_Manifestation.findOne({
                    where: {
                        ID: idAccount,
                        ID_Manifestation: idManif
                    }
                });
                // SUSPECT
                if (!t) {
                    return Promise.reject(new Error("ERREUR A DEFINIR")) // TODO : Remplacer l'erreur
                }
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_ADD_PHOTO\""));
            }
        },

        /**
         * Comment a photo
         * @param {Number} idAccount ID of the account commenting the photo
         * @param {Number} idPhoto ID of the photo
         * @param {String} comment Text of the comment
         * @returns {Promise<Number>}
         * @constructor
         */
        CommentPhoto: async (idAccount, idPhoto, comment) => {
            if (await permissions.FilterPermission(idAccount, "P_COMMENT_PHOTO")) {
                let r = await dataObject.Comments.findOrCreate({where: {Text: comment}});
                await dataObject.Comments_Account_Photo.findOrCreate({
                    where: {
                        ID: idAccount,
                        ID_Photo: idPhoto,
                        ID_Comments: r[0].ID
                    }
                });
                return r.ID;
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_COMMENT_PHOTO\""));
            }
        },

        /**
         * (Dis)Like a photo
         * @param {Number} idAccount ID of the account wishing to like the photo
         * @param {Number} idPhoto ID of the photo
         * @param {Boolean} like true : like, false : do not like anymore
         * @returns {Promise<void>}
         * @constructor
         */
        LikePhoto: async (idAccount, idPhoto, like) => {
            if (await permissions.FilterPermission(idAccount, "P_LIKE_PHOTO")) {
                if (like) {
                    await dataObject.Likes.findOrCreate({where: {ID: idAccount, ID_Photo: idPhoto}});
                } else {
                    await dataObject.Likes.destroy({where: {ID: idAccount, ID_Photo: idPhoto}});
                }
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_LIKE_PHOTO\""));
            }
        },

        /**
         * Get the number of like for a photo
         * @param idPhoto ID of the photo
         * @returns {Promise<Number>}
         * @constructor
         */
        GetLikeCount: async (idPhoto) => {
            return await dataObject.Likes.count({where: {ID_Photo: idPhoto}});
        },

        /**
         * Report a photo
         * @param {Number} idAccount ID of the account wishing to report a photo
         * @param {Number} idPhoto ID of the photo
         * @returns {Promise<void>}
         * @constructor
         */
        Report: async (idAccount, idPhoto) => {
            if (await permissions.FilterPermission(idAccount, "P_REPORT")) {
                await dataObject.Photo.update({Public: false}, {where: {ID: idPhoto}});
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_REPORT\""));
            }
        },

    };
};