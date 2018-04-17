const DB = require('../model/DB');
const PDFDocument = require('pdfkit');
const Json2csvParser = require('json2csv').Parser;

module.exports = {

    getAll: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetAllManifestations().then(manifestations => {
                    res.json({'error': null, 'content': manifestations});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                })
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas getallmanif !', 'content': null});
        }
    },

    get: (req, res) => {
        let reqToken = req.cookies.token;
        let reqID = req.params.id;

        if (reqToken) {
            DB.Manifestation.GetManifestationFromID(reqID).then(manifestation => {
                res.json({'error': null, 'content': manifestation});
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas getallmanif !', 'content': null});
        }
    },

    create: (req, res) => {
        let reqToken = req.cookies.token;
        let reqTitle = req.body.title;
        let reqDescription = req.body.description;
        let reqImagePath = req.body.imagePath;
        let reqDate = req.body.date;

        if (reqToken) {
            DB.Account.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.CreateManifestation();
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas créer manifestation !', 'content': null});
        }
    },

    subscribe: (req, res) => {
        let reqToken = req.cookies.token;
        let reqManifId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.EnrollManifestation(id, reqManifId).then(ok => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas subscribe !', 'content': null});
        }
    },

    validate: (req, res) => {
        let reqToken = req.cookies.token;
        let reqIdeaId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Idea.ValidateIdea(id, reqIdeaId).then(ok => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas valider idée !', 'content': null});
        }
    },

    update: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.body.id;
        let reqName = req.body.name;
        let reqDescription = req.body.description;
        let reqImagePath = req.body.imagePath;
        let reqDate = req.body.date;
        let reqPrice = req.body.price;
        let reqInterval = req.body.interval;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.EditManifestation(id, reqId, reqName, reqDescription, reqImagePath, new Date(reqDate), reqInterval, reqPrice, true).then(() => {
                    res.json({'error': null, 'content': null});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas modifier manif !', 'content': null});
        }
    },

    getSubscribers: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetInscriptions(id, reqId).then(subscribers => {
                    res.json({'error': null, 'content': subscribers});
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas valider idée !', 'content': null});
        }
    },

    getSubscribersPDF: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetInscriptions(id, reqId).then(subscribers => {
                    let pdf = new PDFDocument;
                    let fs=require('fs');
                    pdf.pipe(fs.createWriteStream(res));
                    pdf.fontSize(8);
                    pdf.text(subscribers.toString());
                    pdf.end();
                    res.sendFile(pdf);
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas valider idée !', 'content': null});
        }
    },

    getSubscribersCSV: (req, res) => {
        let reqToken = req.cookies.token;
        let reqId = req.params.id;
        console.log(id);

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetInscriptions(id, reqId).then(subscribers => {
                    console.log(subscribers);
                    try {
                        const parser = new Json2csvParser();
                        const csv = parser.parse(subscribers);
                        console.log(csv);
                        res.sendFile(csv);
                    } catch (err) {
                        console.error(err);
                    }
                }).catch(reason => {
                    res.json({'error': reason.message, 'content': null});
                });
            }).catch(reason => {
                res.json({'error': reason.message, 'content': null});
            });
        } else {
            res.json({'error': 'Pas connecté = pas valider idée !', 'content': null});
        }
    }
};