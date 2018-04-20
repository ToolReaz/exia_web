const sql = require('sequelize');

const connection = new sql(require('./config').DatabaseCred());

const database = {
    Purchase:                       require('./Tables/Purchase')                    (connection, sql),
    Account_Role:                   require('./Tables/Account_Role')                (connection, sql),
    Category:                       require('./Tables/Category')                    (connection, sql),
    Comments:                       require('./Tables/Comments')                    (connection, sql),
    Comments_Account_Photo:         require('./Tables/Comments_Account_Photo')      (connection, sql),
    Idea_Manifestation:             require('./Tables/Idea_Manifestation')          (connection, sql),
    Account:                        require('./Tables/Account')                     (connection, sql),
    PayPalAccount:                  require('./Tables/PayPalAccount')               (connection, sql),
    Idea:                           require('./Tables/Idea')                        (connection, sql),
    Likes:                          require('./Tables/Likes')                       (connection, sql),
    Manifestation:                  require('./Tables/Manifestation')               (connection, sql),
    Basket:                         require('./Tables/Basket')                      (connection, sql),
    Account_Manifestation:          require('./Tables/Account_Manifestation')       (connection, sql),
    Permission:                     require('./Tables/Permission')                  (connection, sql),
    Account_Manifestation_Photo:    require('./Tables/Account_Manifestation_Photo') (connection, sql),
    Photo:                          require('./Tables/Photo')                       (connection, sql),
    Permission_Role:                require('./Tables/Permission_Role')             (connection, sql),
    Product:                        require('./Tables/Product')                     (connection, sql),
    Product_Category:               require('./Tables/Product_Category')            (connection, sql),
    Role:                           require('./Tables/Role')                        (connection, sql),
    Session:                        require('./Tables/Session')                     (connection, sql),
    Vote:                           require('./Tables/Vote')                        (connection, sql)
};

const Permissions =                 require('./Permission/Permissions')             (database);

const DataBase = {
    Account:                        require('./DatabaseObject/Account')             (database, Permissions),
    Token:                          require('./DatabaseObject/Token')               (database, Permissions),
    Photo:                          require('./DatabaseObject/Photo')               (database, Permissions),
    Idea:                           require('./DatabaseObject/Idea')                (database, Permissions),
    Manifestation:                  require('./DatabaseObject/Manifestation')       (database, Permissions),
    PayPal:                         require('./DatabaseObject/PayPal')              (database, Permissions),
    Role:                           require('./DatabaseObject/Role')                (database, Permissions),
    Shop:                           require('./DatabaseObject/Shop')                (database, Permissions)
};

const Tests = require('./Tests/TestsDB')(DataBase);

connection.sync({ force: false, logging: false })
    .then(() => {

        Permissions.SetupPermissions()

        .then(() => { console.log("Successfully initialized DB connection !"); })
        .catch((err) => { console.error(err.message); });

    })
    .catch(err => { console.log('MASTER ERROR !!! : ' + err.message); });

module.exports = DataBase;