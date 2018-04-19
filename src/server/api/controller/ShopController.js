const sendMail = require('../lib/mail');
const nodeMailer = require('nodemailer');
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
                    DB.Shop.GetCategoryFromName(reqCategory).then(category => {
                        DB.Shop.AddItemToCategory(id, parseInt(category.ID), productId).then(() => {
                            res.json({ 'error': null, 'content': null });
                        }).catch(reason => {
                            res.json({ 'error': reason.message, 'content': null });
                        });
                    }).catch(reason => {
                        res.json({ 'error': reason.message, 'content': null });
                    });
                }).catch(reason => {
                    res.json({ 'error': reason.message, 'content': null });
                });
            }).catch(reason => {
                res.json({ 'error': reason.message, 'content': null });
            });
        } else {
            res.json({ 'error': 'Pas connecté = pas créer article !', 'content': null });
        }
    },

    createCategory: (req, res) => {
        let reqToken = req.cookies.token;
        let reqName = req.body.name;
        console.log(req.body.name);
        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.CreateCategory(id, reqName).then(() => {
                    res.json({ 'error': null, 'content': null });
                }).catch(reason => {
                    res.json({ 'error': reason.message, 'content': null });
                });
            }).catch(reason => {
                res.json({ 'error': reason.message, 'content': null });
            });
        } else {
            res.json({ 'error': 'Pas connecté = pas créer article !', 'content': null });
        }
    },

    getAllCategories: (req, res) => {
        DB.Shop.GetAllCategories().then((categories) => {
            res.json({ 'error': null, 'content': categories });
        }).catch(reason => {
            res.json({ 'error': reason.message, 'content': null });
        });
    },

    getAllProducts: (req, res) => {
        DB.Shop.GetAllProducts().then((products) => {
            res.json({ 'error': null, 'content': products });
        }).catch(reason => {
            res.json({ 'error': reason.message, 'content': null });
        });
    },

    addToCart: (req, res) => {
        let reqToken = req.cookies.token;
        let reqID = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.AddItemToPurchaseList(id, parseInt(reqID), 1).then(() => {
                    res.json({ 'error': null, 'content': null });
                }).catch(reason => {
                    res.json({ 'error': reason.message, 'content': null });
                });
            }).catch(reason => {
                res.json({ 'error': reason.message, 'content': null });
            });
        } else {
            res.json({ 'error': 'Pas connecté = pas ajouter article au panier !', 'content': null });
        }
    },

    order: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.CommitPurchase(id).then((order) => {
                    let message = {
                        from: '"BDE" <bde@firemail.cc>', // sender address
                        to: 'jerome.zilliox@viacesi.fr', // list of receivers
                        subject: 'Hello from the new BDE website !', // Subject line
                        html: '<b>Hello world?</b>' // html body
                    };
                    const transporter = nodeMailer.createTransport({ host: 'mail.cock.li', port: 465, secure: true, auth: { user: 'bde@firemail.cc', pass: '147258369', type: 'login' } });
                    transporter.verify((err, success) => {
                        if (err) {
                        } else {
                            transporter.sendMail(message).then(() => {
                                res.json({ 'error': null, 'content': null });
                            }).catch(err => {
                                res.json({ 'error': err.message, 'content': null });
                            });
                        }
                    });


                }).catch(reason => {
                    res.json({ 'error': reason.message, 'content': null });
                });
            }).catch(reason => {
                res.json({ 'error': reason.message, 'content': null });
            });
        } else {
            res.json({ 'error': 'Pas connecté = pas ajouter article au panier !', 'content': null });
        }
    },

    top3: (req, res) => {
        DB.Shop.GetTopThree().then(top3 => {
            res.json({ 'error': null, 'content': top3 });
        }).catch(reason => {
            res.json({ 'error': reason.message, 'content': null });
        });
    },

    getBasketContent: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.GetPurchaseListOfUser(id).then(orderList => {
                    res.json({ 'error': null, 'content': orderList });
                }).catch(reason => {
                    res.json({ 'error': reason.message, 'content': null });
                });
            }).catch(reason => {
                res.json({ 'error': reason.message, 'content': null });
            });
        } else {
            res.json({ 'error': 'Pas connecté = pas ajouter article au panier !', 'content': null });
        }
    }
};