module.exports = {

    /**
     * Ajoute une photo à une manif
     * @param {int} idAccount ID du compte souhaitant uploader l'image
     * @param {string} photoPath Path de l'image
     * @param {int} idManif ID de la manifestation
     */
    AddPhoto: (idAccount, photoPath, idManif) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_ADD_PHOTO", (ok) => {
                if (ok) {
                    Photos.findOrCreate({ where: { Chemin_Image: photoPath }, defaults: { Public: false } }).then(r => {
                        Photographie.findOrCreate({ where: { ID_Photos: r.ID, ID_Manifestation: idManif, ID: idAccount } }).then(s => {
                            Participe.findOne({ where: { ID: idAccount, ID_Manifestation: idManif } }).then(t => {
                                if (t) resolve(); else reject();
                            });
                        });
                    });
                }
            });
        });
    },
    /**
     * Commente une photo
     * @param {int} idAccount ID du compte
     * @param {int} idPhoto ID de la photo
     * @param {string} comment Commentaire pour la photo
     */
    CommentPhoto: (idAccount, idPhoto, comment) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_COMMENT_PHOTO", (ok) => {
                if (ok) {
                    Comment.findOrCreate({ where: { ID: idAccount, ID_Photos: idPhoto, Texte: comment } }).then(r => {
                        resolve();
                    });
                }
            });
        });
    },
    /**
     * Like une photo
     * @param {int} idAccount ID du compte
     * @param {int} idPhoto ID de la photo
     * @param {boolean} like True : like, False : plus like
     */
    LikePhoto: (idAccount, idPhoto, like) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_LIKE_PHOTO", (ok) => {
                if (ok) {
                    if (like) {
                        likes.findOrCreate({ where: { ID: idAccount, ID_Photos: idPhoto } }).then(r => {
                            resolve();
                        });
                    } else {
                        likes.destroy({ where: { ID: idAccount, ID_Photos: idPhoto } }).then(r => {
                            resolve();
                        });
                    }
                }
            });
        });
    },
    /**
     * Récupère le nombre de like d'une image
     * @param {int} idPhoto ID de la photo dont il faut récupérer le nombre de like
     */
    GetLikeCount: (idPhoto) => {
        return new Promise((resolve, reject) => {
            Likes.count({ where: { ID_Photos: idPhoto } }).then(r => {
                resolve(r);
            });
        });
    }
};