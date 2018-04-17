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
    Purchase :          require('./Tables/Achats')          (connection, sql),
    Account_Role :      require('./Tables/Appartient')      (connection, sql),
    Category :       require('./Tables/Categorie')       (connection, sql),
    Comments :    require('./Tables/Commentaires')    (connection, sql),
    Comments_Account_Photo :        require('./Tables/Commente')        (connection, sql),
    Idea_Manifestation :        require('./Tables/Comprend')        (connection, sql),
    Account :          require('./Tables/Compte')          (connection, sql),
    PayPalAccount :   require('./Tables/Compte_PayPal')   (connection, sql),
    Idea :            require('./Tables/Idee')            (connection, sql),
    Likes :           require('./Tables/Likes')           (connection, sql),
    Manifestation :   require('./Tables/Manifestation')   (connection, sql),
    Basket :          require('./Tables/Panier')          (connection, sql),
    Account_Manifestation :       require('./Tables/Participe')       (connection, sql),
    Permission :      require('./Tables/Permission')      (connection, sql),
    Account_Manifestation_Photo :    require('./Tables/Photographie')    (connection, sql),
    Photo :          require('./Tables/Photos')          (connection, sql),
    Permission_Role :         require('./Tables/Possede')         (connection, sql),
    Product :         require('./Tables/Produit')         (connection, sql),
    Product_Category :        require('./Tables/Regroupe')        (connection, sql),
    Role :            require('./Tables/Role')            (connection, sql),
    Session :         require('./Tables/Session')         (connection, sql),
    Vote :            require('./Tables/Vote')            (connection, sql)
};

const Permissions =   require('./Permission/Permissions') (database);

const DataBase = {
    Account :          require('./DatabaseObject/Compte')          (database, Permissions),
    Token :           require('./DatabaseObject/Token')           (database, Permissions),
    Photo :           require('./DatabaseObject/Photo')           (database, Permissions),
    Idea :            require('./DatabaseObject/Idea')            (database, Permissions),
    Manifestation :   require('./DatabaseObject/Manifestation')   (database, Permissions),
    PayPal :          require('./DatabaseObject/PayPal')          (database, Permissions),
    Role :            require('./DatabaseObject/Role')            (database, Permissions),
    Shop :            require('./DatabaseObject/Shop')            (database, Permissions)
};


connection.sync({ force: false, logging: false }).then(() => {

    Permissions.SetupPermissions().then(()=>{
        console.log("Successfully initialized DB connection !");
        //DataBase.Shop.AddProduct(2, "helloworld", "jonskeet", 250000)
        //DataBase.Idea.CreateIdea(2, "Nouvelle idée", "Contenu de la nouvelle idée", [DataBase.Manifestation.CreateManifestation("Nom de la manif", "Description de la manif", "/dev/image", Date.now(), 0, 500)])
        //DataBase.Idea.ValidateIdea(2, 8)
        //DataBase.Manifestation.EditManifestation(2, 9, "NAME", "DESC", "IMAGE", Date.now(), 0, 100, true)
        //DataBase.Shop.AddItemToPurchaseList(2, 2, 10)
        //DataBase.Token.GetAccountFromToken('c3ecbebb542cf94e9d8e60b09cc95db0689b9c0ad56cee450600787ad80f88a10e271c34268b738e5d651f08a647d70639c05ebd1d085d366642c979e461d91f')
        /*.then((r)=>{
            console.log(r);
        })
        .catch((err)=>{
            console.error(err.message);
        });*/
    }).catch(err=>console.error(err.message));

}).catch(err=>{console.log('MASTER ERROR !!! : '+err.message);});

module.exports = DataBase;