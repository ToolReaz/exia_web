module.exports = (dataBase) => {

    return {

        PerformTests: async (alreadyTested) => {
            if(!alreadyTested){
                var userID = 27;
//                var userID = await dataBase.Account.CreateUser("TesterEmail", "TEST123", "FOR TEST PURPOSE", "TEST");
//                await dataBase.Role.AddRole(userID, 1);
//                await dataBase.Role.AddRole(userID, 2);
//                await dataBase.Role.AddRole(userID, 3);
//                await dataBase.Account.SetToken(userID, "TEST_TOKEN");
                var token = "TEST_TOKEN";
                var account = await dataBase.Account.GetAccount("TesterEmail");
                var account2 = await dataBase.Account.GetAccountFromId(userID);
                var account3 = await dataBase.Token.GetAccountFromToken(token);

                var OK1 = account===account2&&account2===account3; // IF ALL ACCOUNT FUNCTIONS WORK CORRECTLY

                var RolesID = await dataBase.Role.GetRolesIDFromUser(userID);
                var Roles = await dataBase.Role.GetRolesFromUser(userID);
                var RolesIDFromRoles = Roles.map(d=>d.ID);
                var RolesNames = Roles.map(d=>d.RoleName);
                var RolesIDFromRolesNames = [];
                for(let i = 0; i<RolesNames.length; i++){
                    var RoleID = await dataBase.Role.GetRoleFromName(RolesNames[i]);
                    RolesIDFromRolesNames.push(RoleID.ID);
                }
                var RolesIDFromRoles2 = [];
                for(let i = 0; i<Roles.length; i++){
                    var RoleID = await dataBase.Role.GetRoleFromID(Roles[i].ID);
                    RolesIDFromRoles2.push(RoleID);
                }

                var OK2 = RolesIDFromRoles===RolesID&&RolesID===RolesIDFromRoles2&&RolesID===RolesIDFromRolesNames; // IF ALL ROLE FUNCTIONS WORK CORRECTLY

                var Ideas = await dataBase.Idea.GetAllIdeas(userID);
                var CreatedIdeaID = await dataBase.Idea.CreateIdea(userID, "TEST_IDEA", "TEXT_TEST_IDEA", [dataBase.Manifestation.CreateManifestation('TEST123', 'TEST123DESC', '/dev/test', new Date(), 0, 5500)]);
                await dataBase.Idea.VoteIdea(userID, CreatedIdeaID, true);
                var voteFor = await dataBase.Idea.GetVoteForCount(CreatedIdeaID);
                var voteAgainst = await dataBase.Idea.GetVoteAgainstCount(CreatedIdeaID);

                var _OK3_1 = voteFor===1 && voteAgainst===0;

                await dataBase.Idea.ValidateIdea(userID, CreatedIdeaID);
                var Idea = await dataBase.Idea.GetIdeaFromId(CreatedIdeaID);

                var OK3 = _OK3_1&&!!Idea.Approved===true;  // IF ALL IDEA FUNCTIONS WORK CORRECTLY

                var productID = await dataBase.Shop.AddProduct(userID, 'TEST_PRODUCT', 'TEST', 5000);
                var addedProduct = await dataBase.Shop.GetProductFromID(productID);
                var products = await dataBase.Shop.GetAllProducts();
                var category = await dataBase.Shop.CreateCategory(userID, 'TEST_CATEGORY');
                var category4 = await dataBase.Shop.GetCategoryFromName('TEST_CATEGORY');
                await dataBase.Shop.AddItemToCategory(userID, category.ID, productID);
                var category2 = await dataBase.Shop.GetCategorieFromID(category.ID);
                var category3 = await dataBase.Shop.GetCategoryFromName('TEST_CATEGORY');

                var OKCategory = category===category2&&category===category3&&category===category4;

                var categoryContent = await dataBase.Shop.GetProductsFromCategorieID(category.ID);
                await dataBase.Shop.AddItemToPurchaseList(userID, productID, 1024);
                var purchaseList = await dataBase.Shop.GetPurchaseListOfUser(userID);
                await dataBase.Shop.RemoveItemFromPurchaseList(userID, productID, 512);
                await dataBase.Shop.CommitPurchase(userID);
                var purchased = await dataBase.Shop.GetHistoryOfPurchase(userID);
                var categories = await dataBase.Shop.GetAllCategories();

                // END OF SHOP



            }
        }

    };

};