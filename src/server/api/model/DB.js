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
};

const Permissions =   require('./Permission/Permissions') (database);

const DataBase = {
    Compte :          require('./DatabaseObject/Compte')          (database, Permissions),
    Token :           require('./DatabaseObject/Token')           (database, Permissions),
    Photo :           require('./DatabaseObject/Photo')           (database, Permissions),
    Idea :            require('./DatabaseObject/Idea')            (database, Permissions),
    Manifestation :   require('./DatabaseObject/Manifestation')   (database, Permissions),
    PayPal :          require('./DatabaseObject/PayPal')          (database, Permissions),
    Role :            require('./DatabaseObject/Role')            (database, Permissions),
    Shop :            require('./DatabaseObject/Shop')            (database, Permissions)
};


connection.sync({ force: false, logging: false }).then(() => {

    Permissions.SetupPermissions();

    DataBase.Shop.AddProduct(2, "test", "testDescription", 1000).then(()=>{
        console.log('ok');
    }).catch(err=>{
        console.error(err.message);
    })

}).catch(err=>{console.log('MASTER ERROR !!! : '+err.message);});

module.exports = DataBase;