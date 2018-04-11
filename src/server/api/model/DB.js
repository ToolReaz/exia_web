const sql = require('sequelize');

const connection = new sql({
    dialect: 'mysql',
    username: 'exia',
    password: 'ingenieur123*',
    database: 'exia',
    host: 'toolreaz.space',
    port: '3306',
    logging: false
});

const Permissions =     require('./Permission/Permissions');

const Appartient =      require('./Tables/Appartient')      (connection, sql);
const Categorie =       require('./Tables/Categorie')       (connection, sql);
const Commente =        require('./Tables/Commente')        (connection, sql);
const Comprend =        require('./Tables/Comprend')        (connection, sql);
const Compte =          require('./Tables/Compte')          (connection, sql);
const Compte_PayPal =   require('./Tables/Compte_PayPal')   (connection, sql);
const Idee =            require('./Tables/Idee')            (connection, sql);
const Likes =           require('./Tables/Likes')           (connection, sql);
const Manifestation =   require('./Tables/Manifestation')   (connection, sql);
const Panier =          require('./Tables/Panier')          (connection, sql);
const Participe =       require('./Tables/Participe')       (connection, sql);
const Permission =      require('./Tables/Permission')      (connection, sql);
const Photographie =    require('./Tables/Photographie')    (connection, sql);
const Photos =          require('./Tables/Photos')          (connection, sql);
const Possede =         require('./Tables/Possede')         (connection, sql);
const Produit =         require('./Tables/Produit')         (connection, sql);
const Regroupe =        require('./Tables/Regroupe')        (connection, sql);
const Role =            require('./Tables/Role')            (connection, sql);
const Session =         require('./Tables/Session')         (connection, sql);
const Vote =            require('./Tables/Vote')            (connection, sql);

var DataBase = {};

// TODO : Retour d'erreur si non autorisé
DataBase.Compte =           require('./DatabaseObject/Compte');
DataBase.Token =            require('./DatabaseObject/Token');
DataBase.Photo =            require('./DatabaseObject/Photo');
DataBase.Idea =             require('./DatabaseObject/Idea');
DataBase.Manifestation =    require('./DatabaseObject/Manifestation');
DataBase.PayPal =           require('./DatabaseObject/PayPal');

connection.sync({ force: false, logging: false }).then(() => {

    Permissions.SetupPermissions();

});

module.exports = DataBase;