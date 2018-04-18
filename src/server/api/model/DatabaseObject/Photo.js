module.exports = (dataObject, permissions) => {

    const here = {

        /**
         * Add a photo to a manifestation
         * @param {Number} idAccount ID of the account
         * @param {String} photoPath Path to the file
         * @param {Number} idManif ID of the manifestation
         * @returns {Number} ID of the inserted photo
         */
        AddPhoto: async (idAccount, photoPath, idManif) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_PHOTO")) {
                let t = await dataObject.Account_Manifestation.findOne({
                    where: {
                        ID_Account: idAccount,
                        ID_Manifestation: idManif
                    }
                });

                if (!t) {
                    return Promise.reject(new Error("This user (#"+idAccount+") did not take part in this manifestation (#"+idManif+")"));
                } else {
                    let r = await dataObject.Photo.findOrCreate({
                        where: {ImagePath: photoPath},
                        defaults: {Public: false}
                    });
                    await dataObject.Account_Manifestation_Photo.findOrCreate({
                        where: {
                            ID_Photo: r.ID,
                            ID_Manifestation: idManif,
                            ID_Account: idAccount
                        }
                    });
                    return r.ID;
                }
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_ADD_PHOTO\""));
            }
        },

        GetPhotoById: async (idPhoto) => {
            return await dataObject.Photo.findOne({where: {ID: idPhoto}});
        },

        GetCommentsOfPhoto: async (idPhoto) => {
            return await dataObject.Comments_Account_Photo.findAll({where: {ID_Photo: idPhoto}});
        },

        GetCommentContent: async (idComment) => {
            return await dataObject.Comments.findOne({where: {ID: idComment }});
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
                let r = await dataObject.Comments.findOrCreate({where: {Text: comment}, defaults: {Public: true}});
                await dataObject.Comments_Account_Photo.findOrCreate({
                    where: {
                        ID_Account: idAccount,
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
                    await dataObject.Likes.findOrCreate({where: {ID_Account: idAccount, ID_Photo: idPhoto}});
                } else {
                    await dataObject.Likes.destroy({where: {ID_Account: idAccount, ID_Photo: idPhoto}});
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

        GetAllCommentsTextFromPhoto: async (idPhoto) => {
            var s = await here.GetCommentsOfPhoto(idPhoto);
            var ret = [];
            for (var i = 0; i < s.length; i++) {
                var comment = s[i];
                var commentText = await here.GetCommentContent(comment.ID_Comments);
                ret.push(commentText);
            }
            return ret;
        }

    };

    return here;
};