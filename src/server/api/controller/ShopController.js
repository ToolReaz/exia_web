const DB = require('../model/DB');
const nodemailer = require('nodemailer');

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
    },

    getAllProducts: (req, res) => {
        DB.Shop.GetAllProducts().then((products) => {
            res.json({'error': null, 'content': products});
        }).catch(reason => {
            res.json({'error': reason.message, 'content': null});
        });
    },

    addToCart: (req, res) => {
        let reqToken = req.cookies.token;
        let reqID= req.params.ID;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.AddItemToPurchaseList(id, reqID, 1).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas ajouter article au panier !', 'content': null});
        }
    },

    order: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Shop.CommitPurchase(id).then((res) => {

                    /*
                    nodemailer.createTestAccount((err, account) => {
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.ethereal.email',
                            port: 587,
                            secure: false,
                            auth: {
                                user: account.user,
                                pass: account.pass
                            }
                        });

                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"Fred Foo 👻" <foo@example.com>', // sender address
                            to: 'bar@example.com, baz@example.com', // list of receivers
                            subject: 'Hello ✔', // Subject line
                            text: 'Hello world?', // plain text body
                            html: '<b>Hello world?</b>' // html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        });
                    });*/




                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas ajouter article au panier !', 'content': null});
        }
    }
};