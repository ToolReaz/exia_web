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
    Purchase :                      require('./Tables/Purchase')                    (connection, sql),
    Account_Role :                  require('./Tables/Account_Role')                (connection, sql),
    Category :                      require('./Tables/Category')                    (connection, sql),
    Comments :                      require('./Tables/Comments')                    (connection, sql),
    Comments_Account_Photo :        require('./Tables/Comments_Account_Photo')      (connection, sql),
    Idea_Manifestation :            require('./Tables/Idea_Manifestation')          (connection, sql),
    Account :                       require('./Tables/Account')                     (connection, sql),
    PayPalAccount :                 require('./Tables/PayPalAccount')               (connection, sql),
    Idea :                          require('./Tables/Idea')                        (connection, sql),
    Likes :                         require('./Tables/Likes')                       (connection, sql),
    Manifestation :                 require('./Tables/Manifestation')               (connection, sql),
    Basket :                        require('./Tables/Basket')                      (connection, sql),
    Account_Manifestation :         require('./Tables/Account_Manifestation')       (connection, sql),
    Permission :                    require('./Tables/Permission')                  (connection, sql),
    Account_Manifestation_Photo :   require('./Tables/Account_Manifestation_Photo') (connection, sql),
    Photo :                         require('./Tables/Photo')                       (connection, sql),
    Permission_Role :               require('./Tables/Permission_Role')             (connection, sql),
    Product :                       require('./Tables/Product')                     (connection, sql),
    Product_Category :              require('./Tables/Product_Category')            (connection, sql),
    Role :                          require('./Tables/Role')                        (connection, sql),
    Session :                       require('./Tables/Session')                     (connection, sql),
    Vote :                          require('./Tables/Vote')                        (connection, sql)
};

const Permissions =   require('./Permission/Permissions') (database);

const DataBase = {
    Account :         require('./DatabaseObject/Account')          (database, Permissions),
    Token :           require('./DatabaseObject/Token')           (database, Permissions),
    Photo :           require('./DatabaseObject/Photo')           (database, Permissions),
    Idea :            require('./DatabaseObject/Idea')            (database, Permissions),
    Manifestation :   require('./DatabaseObject/Manifestation')   (database, Permissions),
    PayPal :          require('./DatabaseObject/PayPal')          (database, Permissions),
    Role :            require('./DatabaseObject/Role')            (database, Permissions),
    Shop :            require('./DatabaseObject/Shop')            (database, Permissions)
};

const Tests = require('./Tests/TestsDB')(DataBase);

connection.sync({ force: false, logging: false }).then(() => {

    Permissions.SetupPermissions().then(()=>{
        console.log("Successfully initialized DB connection !");
        //DataBase.Shop.AddProduct(3, "helloworld", "jonskeet", 250000)
        //DataBase.Idea.CreateIdea(3, "Nouvelle idée", "Contenu de la nouvelle idée", [DataBase.Manifestation.CreateManifestation("Name de la manif", "Description de la manif", "/dev/image", Date.now(), 0, 500)])
        //DataBase.Idea.ValidateIdea(2, 8)
        //DataBase.Manifestation.EditManifestation(2, 9, "NAME", "DESC", "IMAGE", Date.now(), 0, 100, true)
        //DataBase.Shop.AddItemToPurchaseList(2, 2, 10)
        //DataBase.Token.GetAccountFromToken('3b46267bd98b2aac0cee3a9324c65839ee3089c07333eec2c683fb09d6c377c3b3db8c7f1c7f1064e59d81c081df99a3cec12942f4fa891e6d8616a4a846262a')
        //DataBase.Account.CreateUser("this.is@a.test", '123', 'Jean', 'Doe')
        //DataBase.Role.GetRolesFromUser(3)
        //DataBase.Shop.AddItemToPurchaseList(3, 1, 1)
        /*.then((r)=>{
            console.log(r);
        })
        .catch((err)=>{
            console.error(err.message);
        });*/

        //Tests.PerformTests().then().catch(err=>console.error(err));

    })//.catch(err=>console.error(err.message));

}).catch(err=>{console.log('MASTER ERROR !!! : '+err.message);});

module.exports = DataBase;