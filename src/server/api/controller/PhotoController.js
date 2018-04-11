const DB = require('../model/DB');

module.exports = {

    add: (req, res) => {
        let reqPath = req.body.imagePath;
        let reqIdManifestation = req.body.idManifestation;
        let reqToken = req.cookies.token;

        if (!reqIdManifestation || !reqPath) {
            res.json({'error': 'Image invalide !'});
        } else {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.AddPhoto(id, reqPath, reqIdManifestation).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason}));
            }).catch(reason => res.json({'error': reason}));
        }
    },

    comment: (req, res) => {
        let reqText = req.body.text;
        let reqPublic = req.body.public;
        let reqIdPhoto = req.body.idPhoto;
        let reqToken = req.cookies.token;

        if (!reqText) {
            res.json({'error': 'Commentaire non valide !'});
        } else {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Photo.CommentPhoto(id, reqIdPhoto, reqText).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => res.json({'error': reason}));
            }).catch(reason => res.json({'error': reason}));
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
                }).catch(reason => res.json({'error': reason}));
            }).catch(reason => res.json({'error': reason}));
        }
    },

    getLikeCount: (req, res) => {
        let reqIdPhoto = req.params.idPhoto;

        if (!reqIdPhoto) {
            res.json({'error': 'Photo sélectionner invalide !'});
        }  else {
            DB.Photo.GetLikeCount(reqIdPhoto).then(photo => {
                res.json({'error': null, 'content': null});
            }).catch(reason => res.json({'error': reason}));
        }
    }

};