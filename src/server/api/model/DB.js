import sql from "sequelize";

const connection = new sql({
    database:       'exia',
    dialect:        'mysql',
    host:           'toolreaz.space',
    logging:        false,
    password:       'ingenieur123*',
    port:           '3306',
    username:       'exia'
});

const database = {
    Achats:         require('./Tables/Achats')                  .default(connection, sql),
    Appartient:     require('./Tables/Appartient')              .default(connection, sql),
    Categorie:      require('./Tables/Categorie')               .default(connection, sql),
    Commentaires:   require('./Tables/Commentaires')            .default(connection, sql),
    Commente:       require('./Tables/Commente')                .default(connection, sql),
    Comprend:       require('./Tables/Comprend')                .default(connection, sql),
    Compte:         require('./Tables/Compte')                  .default(connection, sql),
    Compte_PayPal:  require('./Tables/Compte_PayPal')           .default(connection, sql),
    Idee:           require('./Tables/Idee')                    .default(connection, sql),
    Likes:          require('./Tables/Likes')                   .default(connection, sql),
    Manifestation:  require('./Tables/Manifestation')           .default(connection, sql),
    Panier:         require('./Tables/Panier')                  .default(connection, sql),
    Participe:      require('./Tables/Participe')               .default(connection, sql),
    Permission:     require('./Tables/Permission')              .default(connection, sql),
    Photographie:   require('./Tables/Photographie')            .default(connection, sql),
    Photos:         require('./Tables/Photos')                  .default(connection, sql),
    Possede:        require('./Tables/Possede')                 .default(connection, sql),
    Produit:        require('./Tables/Produit')                 .default(connection, sql),
    Regroupe:       require('./Tables/Regroupe')                .default(connection, sql),
    Role:           require('./Tables/Role')                    .default(connection, sql),
    Session:        require('./Tables/Session')                 .default(connection, sql),
    Vote:           require('./Tables/Vote')                    .default(connection, sql)
}

const Permissions = require('./Permission/Permissions')         .default(database);

const DataBase = {
    Compte:         require('./DatabaseObject/Compte')          .default(database, Permissions),
    Token:          require('./DatabaseObject/Token')           .default(database, Permissions),
    Photo:          require('./DatabaseObject/Photo')           .default(database, Permissions),
    Idea:           require('./DatabaseObject/Idea')            .default(database, Permissions),
    Manifestation:  require('./DatabaseObject/Manifestation')   .default(database, Permissions),
    PayPal:         require('./DatabaseObject/PayPal')          .default(database, Permissions),
    Role:           require('./DatabaseObject/Role')            .default(database, Permissions),
    Shop:           require('./DatabaseObject/Shop')            .default(database, Permissions)
};


connection.sync({
    force:          false,
    logging:        false
}).then(() => {

    Permissions.SetupPermissions();

});

export default DataBase;