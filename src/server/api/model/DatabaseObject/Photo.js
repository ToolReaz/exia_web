module.exports = (dataObject, permissions) => {

    var here = {

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
                var r = await dataObject.Photos.findOrCreate({ where: { Chemin_Image: photoPath }, defaults: { Public: false } });
                var s = await dataObject.Photographie.findOrCreate({ where: { ID_Photos: r.ID, ID_Manifestation: idManif, ID: idAccount } });
                var t = await dataObject.Participe.findOne({ where: { ID: idAccount, ID_Manifestation: idManif } });
                // SUSPECT
                if (!t) {
                    Promise.reject(new Error("ERREUR A DEFINIR")) // TODO : Remplacer l'erreur
                }
            }
        },

        /**
         * Commente une photo
         * @param {Number} idAccount ID du compte
         * @param {Number} idPhoto ID de la photo
         * @param {String} comment Commentaire pour la photo
         */
        CommentPhoto: async (idAccount, idPhoto, comment) => {
            if (await permissions.FilterPermission(idAccount, "P_COMMENT_PHOTO")) {
                var r = await dataObject.Commentaires.findOrCreate({ where: { Texte: comment } });
                var s = await dataObject.Commente.findOrCreate({ where: { ID: idAccount, ID_Photos: idPhoto, ID_Commentaires: r[0].ID } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_COMMENT_PHOTO\""));
            }
        },

        /**
         * Like une photo
         * @param {Number} idAccount ID du compte
         * @param {Number} idPhoto ID de la photo
         * @param {Boolean} like True : like, False : plus like
         */
        LikePhoto: async (idAccount, idPhoto, like) => {
            if (await permissions.FilterPermission(idAccount, "P_LIKE_PHOTO")) {
                if (like) {
                    var r = await dataObject.likes.findOrCreate({ where: { ID: idAccount, ID_Photos: idPhoto } });
                } else {
                    var r = await dataObject.likes.destroy({ where: { ID: idAccount, ID_Photos: idPhoto } });
                }
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_LIKE_PHOTO\""));
            }
        },

        /**
         * Récupère le nombre de like d'une image
         * @param {Number} idPhoto ID de la photo dont il faut récupérer le nombre de like
         */
        GetLikeCount: async (idPhoto) => {
            return await dataObject.Likes.count({ where: { ID_Photos: idPhoto } });
        },

        /**
         * Report une photo
         * @param {Number} idAccount ID du compte souhaitant report la photo
         * @param {Number} idPhoto ID de la photo à report
         */
        Report: async (idAccount, idPhoto) => {
            if(await permissions.FilterPermission(idAccount, "P_REPORT")){
                var r = await dataObject.Photos.update({ Public: false }, { where: { ID: idPhoto } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_REPORT\""));
            }
        },

    };

    return here;
}