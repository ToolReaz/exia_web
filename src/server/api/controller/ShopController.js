const DB = require('../model/DB');

module.exports = {

    createArticle: (req, res) => {
        let reqToken = req.cookies.token;
        let reqName = req.body.name;
        let reqDescription = req.body.description;
        let reqPrice = req.body.price;
        let reqCategory = req.body.category;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.AddProduct(id, reqName, reqDescription, reqPrice).then((productId) => {
                    DB.Shop.GetCategorieFromName(reqCategory).then(category => {
                        console.log(productId);
                        DB.Shop.AddItemToCategorie(id, category.dataValues.ID, productId).then(() => {
                            res.json({'error': null, 'content': null});
                        }).catch(reason => {
                            res.json({'error': reason.message, 'content': null});
                        });
                    }).catch(reason => {
                        res.json({'error': reason.message, 'content': null});
                    });
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas créer article !', 'content': null});
        }
    },

    createCategory: (req, res) => {
        let reqToken = req.cookies.token;
        let reqName = req.body.name;
        console.log(req.body.name);
        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.CreateCategorie(id, reqName).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas créer article !', 'content': null});
        }
    },

    getAllCategories: (req, res) => {
        DB.Shop.GetAllCategories().then((categories) => {
            res.json({'error': null, 'content': categories});
        }).catch(reason => {
            res.json({'error': reason.message, 'content': null});
        });
    }
};