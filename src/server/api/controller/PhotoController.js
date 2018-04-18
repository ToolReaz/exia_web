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

    like: (req, res, type) => {
        let reqIdPhoto = req.params.id;
        let reqToken = req.cookies.token;

        if (!reqIdPhoto || !reqToken) {
            res.json({'error': 'Photo sélectionner invalide OU connecter vous !'});
        }  else {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.LikePhoto(id, reqIdPhoto, type).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        }
    },


    hasliked: (req, res) => {
        let reqIdPhoto = req.params.id;
        let reqToken = req.cookies.token;

        if (!reqIdPhoto || !reqToken) {
            res.json({'error': 'Photo sélectionner invalide OU connecter vous !'});
        }  else {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.HasLiked(id, reqIdPhoto).then((isLiked) => {
                    res.json({'error': null, 'content': isLiked});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        }
    },


    getLikeCount: (req, res) => {
        let reqIdPhoto = req.params.id;

        if (!reqIdPhoto) {
            res.json({'error': 'Photo sélectionnée invalide !'});
        }  else {
            DB.Photo.GetLikeCount(reqIdPhoto).then(likes => {
                res.json({'error': null, 'content': likes});
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
                DB.Photo.GetAllCommentsTextFromPhoto(reqID).then(comments => {
                    res.json({'error': null, 'content': {photo, comments}});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter commentaire'});
        }
    },

    reportPhoto: (req, res) => {
        let reqID = req.params.id;
        let reqToken = req.cookies.token;

        if (reqID && reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.GetPhotoById(reqID).then(photo => {
                    DB.Photo.Report(id, photo.ID_Photo).then(() => {
                        res.json({'error': null, 'content': null});
                    }).catch(reason => res.json({'error': reason.message}));
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter commentaire'});
        }
    },

    reportComment: (req, res) => {
        let reqID = req.params.id;
        let reqToken = req.cookies.token;

        if (reqID && reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.ReportComment(id, reqID).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason.message}));
            }).catch(reason => res.json({'error': reason.message}));
        } else {
            res.json({'error': 'Pas connecté = pas ajouter commentaire'});
        }
    }

};