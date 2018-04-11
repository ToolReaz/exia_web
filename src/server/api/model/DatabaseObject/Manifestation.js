module.exports = {

    /**     
     * Crée une manifestation     
     * @param {string} name Nom de la manifestation à créer    
     * @param {string} description Description de la manifestation à créer    
     * @param {string} imagePath Chemin de l'image associée à la manifestation    
     * @param {Date} date Date de la première (ou seule) occurence de la manifestation    
     * @param {int} interval_seconds Interval en secondes entre deux occurences de la manifestation (0 = pas de répétition)    
     * @param {int} price Prix de participation à la manifestation     
     */
    CreateManifestation: (name, description, imagePath, date, interval_seconds, price) => {
        return {
            Nom: name,
            Description: description,
            Chemin_Image: imagePath,
            Quand: date,
            Intervale: interval_seconds,
            Prix: price,
            Public: false
        };
    },

    /**     
     * Inscrit une personne à une manif     
     * @param {int} idAccount ID du compte voulant s'inscrire à une manif     
     * @param {int} idManif ID de la manif     
     * @returns {Promise<any>} Sans param
     */
    InscrireManif: (idAccount, idManif) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_PARTICIPE_MANIF").then(() => {
                Participe.findOrCreate({
                    where: {
                        ID: idAccount,
                        ID_Manifestation: idManif
                    }
                }).then(r => {
                    resolve();
                }).catch(err => {
                    if (err) reject(err);
                });
            }).catch(err => {
                if (err) reject(err);
            });
        });
    },

    /**     
     * Détermine si l'utilisateur participe à une manif     
     * @param {int} idAccount ID de l'utilisateur     
     * @param {int} idManif ID de la manif     
     * @returns {Promise<boolean>} L'utilisateur participe à la manif
     */
    Participe: (idAccount, idManif) => {
        return new Promise((resolve, reject) => {
            Participe.findOne({
                where: {
                    ID: idAccount,
                    ID_Manifestation: idManif
                }
            }).then(r => {
                resolve(r == null);
            }).catch(err => {
                if (err) reject(err);
            });
        });
    },

    /**
     * Récupère l'ensemble des manifestations auxquelles l'utilisateur participe
     * @param {int} idAccount ID de l'utilisateur
     */
    ListeInscriptions: (idAccount) => {
        return Participe.findAll({ where: { ID: idAccount } });
    },

    /**
     * retourne les évenements du mois (passés et futurs) et les répétitions d'anciens events
     */
    GetThisMonthEvents: () => {
        return new Promise((resolve, reject) => {
            Manifestations.findAll().then(r => {
                var events = [];
                var items = r.length;
                r.forEach(element => {
                    var interval = element.Intervale;
                    var dateInit = Date.now();
                    var minDate = Date.UTC(new Date(Date.now()).getUTCFullYear, new Date(Date.now()).getUTCMonth, 1, 0, 0, 0, 0);
                    var maxDate = Date.UTC(new Date(Date.now()).getUTCFullYear, new Date(Date.now()).getUTCMonth + 1, 1, 0, 0, 0, 0) - 1;

                    if (dateInit > minDate
                        && dateInit < maxDate
                        || dateInit < minDate
                        && Math.floor(minDate - dateInit / interval) < Math.floor(maxDate - dateInit / interval)) {
                        events.push(element);
                    }

                    items--;
                    if (items == 0) {
                        resolve(events);
                    }

                });
            }).catch(err => { if (err) reject(err); });
        });
    },

    EditManifestation: (idManif, name, description, imagePath, date, timespan, price, public) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_VALID_MANIF").then(() => {
                var m = {};
                if (name) m.Nom = name;
                if (description) m.Description = description;
                if (imagePath) m.Chemin_Image = imagePath;
                if (date) m.Quand = date;
                if (timespan) m.Intervale = timespan;
                if (price) m.Prix = price;
                if (public) m.Public = public;
                Manifestations.update(m, { where: { ID: idManif } }).then(r => { resolve() }).catch(err => { reject(err); });
            }).catch(err => {
                if (err) reject(err);
            });
        });
    },

    GetManifestationAuthor: (idManif) => {
        return new Promise((resolve, reject)=>{
            Comprend.findOne({where: {ID: idManif}}).then(r=>{
                if(r){
                    Idee.findOne({where: {ID: r.ID}}).then(s=>{
                        if(s){
                            resolve(s.ID_Compte);
                        } else {
                            reject(new Error("L'id de la manifestation #"+idManif+" n'a pas d'idée associée"));
                        }
                    }).catch(err=>{if(err)reject(err);});
                } else {
                    reject(new Error("L'id de la manifestation #"+idManif+" n'existe pas"));
                }
            }).catch(err=>{if(err)reject(err);});
        });
    }

};