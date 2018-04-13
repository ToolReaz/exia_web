module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Ajoute une photo à une manif
         * @param {Number} idAccount ID du compte souhaitant uploader l'image
         * @param {string} photoPath Path de l'image
         * @param {Number} idManif ID de la manifestation
         */
        AddPhoto: (idAccount, photoPath, idManif) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_ADD_PHOTO").then(() => {
                    dataObject.Photos.findOrCreate({
                        where: {
                            Chemin_Image: photoPath
                        },
                        defaults: {
                            Public: false
                        }
                    }).then(r => {
                        dataObject.Photographie.findOrCreate({
                            where: {
                                ID_Photos: r.ID,
                                ID_Manifestation: idManif,
                                ID: idAccount
                            }
                        }).then(s => {
                            dataObject.Participe.findOne({
                                where: {
                                    ID: idAccount,
                                    ID_Manifestation: idManif
                                }
                            }).then(t => {
                                if (t) resolve();
                                else reject();
                            }).catch(err => reject(err))
                        }).catch(err => reject(err))
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },

        /**
         * Commente une photo
         * @param {Number} idAccount ID du compte
         * @param {Number} idPhoto ID de la photo
         * @param {string} comment Commentaire pour la photo
         */
        CommentPhoto: (idAccount, idPhoto, comment) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_COMMENT_PHOTO").then(() => {
                    dataObject.Commentaires.findOrCreate({where: {Texte: comment}}).then(r=>{
                        dataObject.Commente.findOrCreate({where: {ID: idAccount, ID_Photos: idPhoto, ID_Commentaires: r[0].ID}}).then(s=>{
                            resolve();
                        }).catch(err => reject(err))
                    }).catch(err => reject(err))
                }).catch(err => reject(err))
            });
        },

        /**
         * Like une photo
         * @param {Number} idAccount ID du compte
         * @param {Number} idPhoto ID de la photo
         * @param {boolean} like True : like, False : plus like
         */
        LikePhoto: (idAccount, idPhoto, like) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_LIKE_PHOTO").then(() => {
                    if (like) {
                        dataObject.likes.findOrCreate({
                            where: {
                                ID: idAccount,
                                ID_Photos: idPhoto
                            }
                        }).then(r => {
                            resolve();
                        }).catch(err => reject(err))
                    } else {
                        dataObject.likes.destroy({
                            where: {
                                ID: idAccount,
                                ID_Photos: idPhoto
                            }
                        }).then(r => {
                            resolve();
                        }).catch(err => reject(err))
                    }
                }).catch(err => reject(err))
            });
        },

        /**
         * Récupère le nombre de like d'une image
         * @param {Number} idPhoto ID de la photo dont il faut récupérer le nombre de like
         * @returns {promise}
         */
        GetLikeCount: (idPhoto) => {
            return dataObject.Likes.count({
                where: {
                    ID_Photos: idPhoto
                }
            });
        },

        /**
         * Report une photo
         * @param {number} idAccount ID du compte souhaitant report la photo
         * @param {number} idPhoto ID de la photo à report
         */
        Report: (idAccount, idPhoto) => {
            return new Promise((resolve, reject) => {
                permissions.FilterPermission(idAccount, "P_REPORT").then(() => {
                    dataObject.Photos.update({Public: false}, {where: {ID: idPhoto}}).then(r=>{
                        resolve();
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });
        }
    };

    return here;
}