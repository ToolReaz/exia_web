const DB = require('../model/DB');

module.exports = {

    add: (req, res) => {
        let reqToken = req.cookies.token;
        let reqPath = req.body.imagePath;
        let reqID = req.body.id;

        if (reqToken) {

            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.AddPhoto(id, reqPath, reqID).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason}));
            }).catch(reason => res.json({'error': reason}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter photo !'});
        }
    },

    comment: (req, res) => {
        let reqToken = req.cookies.token;
        let reqComment = req.body.comment;
        let reqID = req.body.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.CommentPhoto(id, reqID, reqComment).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter commentaire'});
        }
    },

    like: (req, res) => {
        let reqIdPhoto = req.params.idPhoto;
        let reqToken = req.cookies.token;

        if (!reqIdPhoto) {
            res.json({'error': 'Photo sélectionner invalide !'});
        }  else {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.LikePhoto(id, reqIdPhoto, true).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        }
    },

    getLikeCount: (req, res) => {
        let reqIdPhoto = req.params.idPhoto;

        if (!reqIdPhoto) {
            res.json({'error': 'Photo sélectionner invalide !'});
        }  else {
            DB.Photo.GetLikeCount(reqIdPhoto).then(photo => {
                res.json({'error': null, 'content': null});
            }).catch(reason => res.json({'error': reason.message}));
        }
    },

    getAllPhoto: (req, res) => {
        let reqID = req.params.id;

        if (reqID) {
            DB.Manifestation.GetPhotos(reqID).then((photos) => {
                res.json({'error': null, 'content': photos});
            }).catch(reason => res.json({'error': reason.message}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter commentaire'});
        }
    },

    getOne: (req, res) => {
        let reqID = req.params.id;

        if (reqID) {
            DB.Photo.GetPhotoById(reqID).then(photo => {
                DB.Photo.GetAllCommentsTextFromPhoto(photo.ID_Photo).then(comments => {
                    photo['comments'] = comments;
                    res.json({'error': null, 'content': photo});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter commentaire'});
        }
    }

};