const sql = require('sequelize');

const connection = new sql({
    dialect: 'mysql',
    username: 'exia',
    password: 'ingenieur123*',
    database: 'exia',
    host: 'toolreaz.space',
    port: '3306'
});

const Appartient =      require('./Models/Appartient.js')   (connection, sql);
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

var DataBase = {};

DataBase.CreateUser = (email, password, firstname, lastname, callback) => {
    Compte.findOrCreate({ where: { Adresse_Mail: email }, defaults:{Nom: lastname, Prenom: firstname, Mot_de_passe: password} }).then(r => {
        callback(r[1]); // r[1] si l'utilisateur n'existe pas, !r[1] si il existe
    });
};

DataBase.GetAccount = (email, callback) => {
    Compte.findOne({ where: { Adresse_Mail: email }}).then(r => {
        callback(r);
    });
}


connection.sync().then(() => {

    [{ Code_permission: "P_CONNECT" },          // Autorise la connexion
    { Code_permission: "P_ADD_ACTIVITE" },      // Autorise l'utilisateur à ajouter une activité dans la boîte à idées
    { Code_permission: "P_LIST_ACTIVITE" },     // Autorise l'utilisateur à lister les activitées disponibles
    { Code_permission: "P_VOTE_IDEE" },         // Autorise l'utilisateur à voter pour une activité
    { Code_permission: "P_ADD_PHOTO" },         // Autorise l'utilisateur à ajouter une photo pour une activité
    { Code_permission: "P_LIST_PHOTO" },        // Autorise l'utilisateur à voir les photos pour les activités
    { Code_permission: "P_LIKE_PHOTO" },        // Autorise l'utilisateur à liker des photos
    { Code_permission: "P_COMMENT_PHOTO" },     // Autorise l'utilisateur à commenter des photos
    { Code_permission: "P_ADD_MANIF" },         // Autorise l'utilisateur à ajouter une manifestation (activité autorisée)
    { Code_permission: "P_VALID_MANIF" },       // Autorise l'utilisateur à valider une manifestation proposée par un P_ADD_ACTIVITE
    { Code_permission: "P_LISTE_INSCRITS" },    // Autorise l'utilisateur à lister les personnes inscrite
    { Code_permission: "P_COMMENT_LAST" },      // Autorise l'utilisateur à commenter les dernières activitées
    { Code_permission: "P_ADMIN_PHOTO" },       // Autorise l'utilisateur à administrer la partie photo
    { Code_permission: "P_REPORT" },            // Autorise l'utilisateur à signaler un contenu inaproprié au BDE
    { Code_permission: "P_DUMP_PHOTO" },        // Autorise l'utilisateur à dumper les photos
    { Code_permission: "P_ADD_SHOP" },          // Autorise l'utilisateur à ajouter des produits dans la boutique
    { Code_permission: "P_DELETE_SHOP" },       // Autorise l'utilisateur à supprimer des produits de la boutique
    { Code_permission: "P_PURCHASE_SHOP" }]     // Autorise l'utilisateur à ajouter des produits à son panier
        .forEach(element => {
            Permission.findOrCreate({ where: element });
        });

    Compte.findOrCreate({
        where: {
            Adresse_Mail: 'admin@localhost',
            Nom: 'admin',
            Prenom: 'admin',
            Mot_de_passe: 'admin123'
        }
    });

    DataBase.GetAccount("test@test.com");
});

module.exports = DataBase;