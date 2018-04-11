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
        return { Nom: name, Description: description, Chemin_Image: imagePath, Quand: date, Intervale: interval_seconds, Prix: price, Public: false };
    },

    /**
     * Inscrit une personne à une manif
     * @param {int} idAccount ID du compte voulant s'inscrire à une manif
     * @param {int} idManif ID de la manif
     */
    InscrireManif: (idAccount, idManif) => {
        return new Promise((resolve, reject) => {
            require('../Permission/Permissions').FilterPermission(idAccount, "P_PARTICIPE_MANIF", (ok) => {
                if (ok) {
                    Participe.findOrCreate({ where: { ID: idAccount, ID_Manifestation: idManif } }).then(r => { resolve(); });
                }
            });
        });
    }
    
};