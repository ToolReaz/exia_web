module.exports = {

    /**
     * Ajoute une photo à une manif
     * @param {int} idAccount ID du compte souhaitant uploader l'image
     * @param {string} photoPath Path de l'image
     * @param {int} idManif ID de la manifestation
     * @param {callback} callback Callback (0 param)
     */
    AddPhoto: (idAccount, photoPath, idManif, callback) => {
        require('../Permission/Permissions').FilterPermission(idAccount, "P_ADD_PHOTO", (ok) => {
            if (ok) {
                Photos.findOrCreate({ where: { Chemin_Image: photoPath }, defaults: { Public: false } }).then(r => {
                    Photographie.findOrCreate({ where: { ID_Photos: r.ID, ID_Manifestation: idManif, ID: idAccount } }).then(s => {
                        Participe.findOne({ where: { ID: idAccount, ID_Manifestation: idManif } }).then(t => {
                            if (t) callback();
                        });
                    });
                });
            }
        });
    },
    /**
     * Commente une photo
     * @param {int} idAccount ID du compte
     * @param {int} idPhoto ID de la photo
     * @param {string} comment Commentaire pour la photo
     * @param {callback} callback Callback (0 param)
     */
    CommentPhoto: (idAccount, idPhoto, comment, callback) => {
        require('../Permission/Permissions').FilterPermission(idAccount, "P_COMMENT_PHOTO", (ok) => {
            if (ok) {
                Comment.findOrCreate({ where: { ID: idAccount, ID_Photos: idPhoto, Texte: comment } }).then(r => {
                    callback();
                });
            }
        });
    },
    /**
     * Like une photo
     * @param {int} idAccount ID du compte
     * @param {int} idPhoto ID de la photo
     * @param {boolean} like True : like, False : plus like
     * @param {callback} callback Callback (0 param)
     */
    LikePhoto: (idAccount, idPhoto, like, callback) => {
        require('../Permission/Permissions').FilterPermission(idAccount, "P_LIKE_PHOTO", (ok) => {
            if (ok) {
                if (like) {
                    likes.findOrCreate({ where: { ID: idAccount, ID_Photos: idPhoto } }).then(r => {
                        callback();
                    });
                } else {
                    likes.destroy({ where: { ID: idAccount, ID_Photos: idPhoto } }).then(r => {
                        callback();
                    });
                }
            }
        });
    },
    /**
     * Récupère le nombre de like d'une image
     * @param {int} idPhoto ID de la photo dont il faut récupérer le nombre de like
     * @param {callback} callback Callback (1 param : entier représentant le nombre de like)
     */
    GetLikeCount: (idPhoto, callback) => {
        Likes.count({ where: { ID_Photos: idPhoto } }).then(r => {
            callback(r);
        })
    }
};