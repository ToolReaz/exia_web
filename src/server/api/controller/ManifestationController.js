const DB = require('../model/DB');
const PDFDocument = require('pdfkit');
const csvString = require('csv-string');

module.exports = {

    getAll: (req, res) => {
        let reqToken = req.cookies.token;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetAllManifestations().then(manifestations => {
                    for (var i = 0; i < manifestations.length; i++) {
                        var manif = manifestations[i];
                        manifestations[i].formatedDate = new Date(manif.When).toDateString();
                    }
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
                DB.Manifestation.EnrollManifestation(id, parseInt(reqManifId)).then(() => {
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

    isSubscribed: (req, res) => {
        let reqToken = req.cookies.token;
        let reqManifId = req.params.id;

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.IsUserEnrolled(id, parseInt(reqManifId)).then((enrolled) => {
                    res.json({'error': null, 'content': enrolled});
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
                    res.json({'error': null, 'content': subscribers.length});
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
                    let inscritID = subscribers.map(d=>d.ID_Account);
                    let doc = new PDFDocument();
                    doc.pipe(res);
                    doc.fontSize(14);
                    let i = inscritID.length;
                    doc.text("Nom            Prénom            Email");
                    doc.text(" ");
                    inscritID.forEach(element=>{

                        DB.Account.GetAccountFromId(element).then(d=>{
                            let k = JSON.stringify(d);
                            doc.text(d.LastName + "   " + d.FirstName + "   " + d.Mail);
                            doc.text(" ");
                            i--;
                            if(i===0){
                                doc.end();
                            }
                        }).catch(reason=>{
                            res.json({'error': reason.message, 'content': null});
                        });
                    });

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

        if (reqToken) {
            DB.Token.GetAccountFromToken(reqToken).then(id => {
                DB.Manifestation.GetInscriptions(id, reqId).then(subscribers => {


                    let inscritID = subscribers.map(d=>d.ID_Account);
                    let i = inscritID.length;
                    let users = [];
                    inscritID.forEach(element=> {
                        DB.Account.GetAccountFromId(element).then(d => {
                            console.log(d);
                            let content = {
                                Nom: d.LastName,
                                Prenom: d.FirstName,
                                EMail: d.Mail
                            };
                            users.push(content);
                            i--;
                            if(i===0){
                                let csv = csvString.stringify(users).replace(/"/g, '').replace(/([{}])/g, '');
                                res.set('Content-Type', 'text/csv');
                                res.send(csv);
                            }
                        }).catch(reason => {
                            res.json({'error': reason.message, 'content': null});
                        });
                    });

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