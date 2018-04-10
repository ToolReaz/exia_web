const sql = require('sequelize');

const connection = new sql({
    dialect: 'mysql',
    username: 'exia',
    password: 'ingenieur123*',
    database: 'exia',
    host: 'toolreaz.space',
    port: '3306'
});

const Appartient =      require('./Models/Appartient')   (connection, sql);
const Categorie =       require('./Models/Categorie')       (connection, sql);
const Commente =        require('./Models/Commente')        (connection, sql);
const Comprend =        require('./Models/Comprend')        (connection, sql);
const Compte =          require('./Models/Compte')          (connection, sql);
const Compte_PayPal =   require('./Models/Compte_PayPal')   (connection, sql);
const Idee =            require('./Models/Idee')            (connection, sql);
const Likes =           require('./Models/Likes')           (connection, sql);
const Manifestation =   require('./Models/Manifestation')   (connection, sql);
const Panier =          require('./Models/Panier')          (connection, sql);
const Participe =       require('./Models/Participe')       (connection, sql);
const Permission =      require('./Models/Permission')      (connection, sql);
const Photographie =    require('./Models/Photographie')    (connection, sql);
const Photos =          require('./Models/Photos')          (connection, sql);
const Possede =         require('./Models/Possede')         (connection, sql);
const Produit =         require('./Models/Produit')         (connection, sql);
const Regroupe =        require('./Models/Regroupe')        (connection, sql);
const Role =            require('./Models/Role')            (connection, sql);
const Session =         require('./Models/Session')         (connection, sql);
const Vote =            require('./Models/Vote')            (connection, sql);

/**
 * Calcule un ET logique sur un tableau
 * @param {boolean[]} array Tableau de boolean dont il faut calculer le ET
 */
function AND(array) {
    var out = true;
    array.forEach(element => {
        out &= element;
    });
    return out;
}

/**
 * Définit les permissions
 * @param {string} role Nom du role
 * @param {string} permission Nom de la permission
 * @param {callback} callback Callback après la mise en place des permissions
 */
function SetPermissions(role, permission, callback) {
    Role.findOrCreate({ where: { Nom_role: role } }).then(r => {
        Permission.findOrCreate({ where: { Code_permission: permission } }).then(s => {
            Possede.findOrCreate({ where: { ID: s[0].ID, ID_Role: r[0].ID } }).then(callback());
        });
    });
}

/**
 * Met les permissions de base
 */
function Setup_Permissions() {
    SetPermissions("R_STUDENT", "P_CONNECT", () => { });
    SetPermissions("R_STUDENT", "P_ADD_ACTIVITE", () => { });
    SetPermissions("R_STUDENT", "P_LIST_ACTIVITE", () => { });
    SetPermissions("R_STUDENT", "P_VOTE_IDEE", () => { });
    SetPermissions("R_STUDENT", "P_ADD_PHOTO", () => { });
    SetPermissions("R_STUDENT", "P_LIST_PHOTO", () => { });
    SetPermissions("R_STUDENT", "P_LIKE_PHOTO", () => { });
    SetPermissions("R_STUDENT", "P_COMMENT_PHOTO", () => { });
    SetPermissions("R_STUDENT", "P_ADD_MANIF", () => { });
    SetPermissions("R_BDE", "P_VALID_MANIF", () => { });
    SetPermissions("R_BDE", "P_LISTE_INSCRITS", () => { });
    SetPermissions("R_BDE", "P_COMMENT_LAST", () => { });
    SetPermissions("R_BDE", "P_ADMIN_PHOTO", () => { });
    SetPermissions("R_EXIA", "P_REPORT", () => { });
    SetPermissions("R_EXIA", "P_DUMP_PHOTO", () => { });
    SetPermissions("R_BDE", "P_ADD_SHOP", () => { });
    SetPermissions("R_BDE", "P_DELETE_SHOP", () => { });
    SetPermissions("R_STUDENT", "P_PURCHASE_SHOP", () => { });
}

var DataBase = {};

/**
 * Crée un utilisateur et l'insère dans la base de données
 * @param {string} email Adresse E-Mail de l'utilisateur dont il faut créer le compte
 * @param {string} password Mot de passe (haché) de l'utilisateur dont il faut créer le compte
 * @param {string} firstname Prénom de l'utilisateur dont il faut créer le compte
 * @param {string} lastname Nom de l'utilisateur dont il faut créer le compte
 * @param {Callback} callback Callback selon si l'utilisateur existe (false) ou non (true)
 */
DataBase.CreateUser = (email, password, firstname, lastname, callback) => {
    Compte.findOrCreate({ where: { Adresse_Mail: email }, defaults: { Nom: lastname, Prenom: firstname, Mot_de_passe: password } }).then(r => {
        callback(r[1]); // r[1] si l'utilisateur n'existe pas, !r[1] si il existe
    });
};

/**
 * Crée un compte et l'insère dans la base de données
 * @param {string} email Adresse E-Mail de la personne dont il faut récupérer le compte
 * @param {delegate} callback Callback dont le premier parametre est la réponse de la base de données
 */
DataBase.GetAccount = (email, callback) => {
    Compte.findOne({ where: { Adresse_Mail: email } }).then(r => {
        callback(r);
    });
};

/**
 * Crée une manifestation
 * @param {string} name Nom de la manifestation à créer
 * @param {string} description Description de la manifestation à créer
 * @param {string} imagePath Chemin de l'image associée à la manifestation
 * @param {Date} date Date de la première (ou seule) occurence de la manifestation
 * @param {int} interval_seconds Interval en secondes entre deux occurences de la manifestation (0 = pas de répétition)
 * @param {int} price Prix de participation à la manifestation
 */
DataBase.CreateManifestation = (name, description, imagePath, date, interval_seconds, price) => {
    return { Nom: name, Description: description, Chemin_Image: imagePath, Quand: date, Intervale: interval_seconds, Prix: price, Public: false };
};

/**
 * Crée une idée et l'insère dans la base de données
 * @param {int} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
 * @param {string} title Titre de l'idée
 * @param {string} text Texte/Description de l'idée
 * @param {array} manifestationArray Liste de manifestation obtenue par CreateManifestation
 * @param {callback} callback Callback (aucun param) retourné une fois l'insertion dans la base de données terminée
 */
DataBase.CreateIdea = (idAccount, title, text, manifestationArray, callback) => {
    Idee.findOrCreate({ where: { Titre: title, Texte: text }, defaults: { Soumis_le: Date.now(), ID_Compte: idAccount } }).then(r => {
        var idIdee = r[0].ID;
        var done = [].fill(false, 0, manifestationArray.length);
        for (let i = 0; i < manifestationArray.length; i++) {
            Manifestation.findOrCreate({ where: manifestationArray[i] }).then(r => {
                done[i] = true;
                if (AND(done)) { callback(); }
            });
        }
    });
};

/**
 * Retourne un compte à partir d'un token (penser à vérifier la validité du token avec GetTokenTime)
 * @param {string} token Token de connexion
 * @param {callback} callback Callback (param 1 : compte)
 */
DataBase.GetAccountFromToken = (token, callback) => {
    Session.findOne({ where: { Token: token } }).then(r => {
        Compte.findOne({ where: { ID: r.ID } }).then(c => {
            callback(c);
        });
    });
};

/**
 * Récupère le timestamp d'un token
 * @param {string} token Token dont il faut récupérer le temps
 * @param {callback} callback Callback (param 1 : timestamp du token)
 */
DataBase.GetTokenTime = (token, callback) => {
    Session.findOne({ where: { Token: token } }).then(r => {
        callback(r.Derniere_connexion);
    });
};

/**
 * Crée un token pour un utilisateur
 * @param {int} idCompte ID du compte associé au token
 * @param {string} token Token à insérer pour l'utilisateur spécifié
 * @param {callback} callback Callback (1 param : True si le token n'existait pas, False si le token existait déjà)
 */
DataBase.SetToken = (idCompte, token, callback) => {
    Session.findOrCreate({ where: { Token: token }, defaults: { Derniere_connexion: Date.now(), ID_Compte: idCompte } }).then(r => {
        callback(r[1]);
    });
};

connection.sync().then(() => {

    Setup_Permissions();

});

module.exports = DataBase;