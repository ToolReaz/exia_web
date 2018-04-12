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

const database = {
    Achats :          require('./Tables/Achats')          (connection, sql),
    Appartient :      require('./Tables/Appartient')      (connection, sql),
    Categorie :       require('./Tables/Categorie')       (connection, sql),
    Commentaires :    require('./Tables/Commentaires')    (connection, sql),
    Commente :        require('./Tables/Commente')        (connection, sql),
    Comprend :        require('./Tables/Comprend')        (connection, sql),
    Compte :          require('./Tables/Compte')          (connection, sql),
    Compte_PayPal :   require('./Tables/Compte_PayPal')   (connection, sql),
    Idee :            require('./Tables/Idee')            (connection, sql),
    Likes :           require('./Tables/Likes')           (connection, sql),
    Manifestation :   require('./Tables/Manifestation')   (connection, sql),
    Panier :          require('./Tables/Panier')          (connection, sql),
    Participe :       require('./Tables/Participe')       (connection, sql),
    Permission :      require('./Tables/Permission')      (connection, sql),
    Photographie :    require('./Tables/Photographie')    (connection, sql),
    Photos :          require('./Tables/Photos')          (connection, sql),
    Possede :         require('./Tables/Possede')         (connection, sql),
    Produit :         require('./Tables/Produit')         (connection, sql),
    Regroupe :        require('./Tables/Regroupe')        (connection, sql),
    Role :            require('./Tables/Role')            (connection, sql),
    Session :         require('./Tables/Session')         (connection, sql),
    Vote :            require('./Tables/Vote')            (connection, sql)
}

const Permissions =   require('./Permission/Permissions') (database);

var DataBase = {};

DataBase.Compte =           require('./DatabaseObject/Compte')          (database, Permissions);
DataBase.Token =            require('./DatabaseObject/Token')           (database, Permissions);
DataBase.Photo =            require('./DatabaseObject/Photo')           (database, Permissions);
DataBase.Idea =             require('./DatabaseObject/Idea')            (database, Permissions);
DataBase.Manifestation =    require('./DatabaseObject/Manifestation')   (database, Permissions);
DataBase.PayPal =           require('./DatabaseObject/PayPal')          (database, Permissions);
DataBase.Role =             require('./DatabaseObject/Role')            (database, Permissions);
DataBase.Shop =             require('./DatabaseObject/Shop')            (database, Permissions);

connection.sync({ force: false, logging: false }).then(() => {

    //Permissions.SetupPermissions();

    DataBase.Token.GetAccountFromToken("e934669ff1aed5b97b11c0133abc75c8ac4a3ab2b9135caa9f691d9d4e53ae0b36493455e70b2e342416d0e06ab0491e130365383069d5c5e2c96ab5339c169f")
    .then(r=>console.log(r));

});

module.exports = DataBase;