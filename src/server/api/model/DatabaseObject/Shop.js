module.exports = (dataObject, permissions) => {

    const here = {

        // TESTED

        /**
         * Add a product to the shop
         * @param {Number} idAccount ID of the user account adding a product
         * @param {String} name Name of the product
         * @param {String} description Description of the product
         * @param {Number} price Price of the product
         * @returns {Promise<Number>} ID of the product
         * @constructor
         */
        AddProduct: async(idAccount, name, description, price) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_SHOP")) {
                let r = await dataObject.Product.findOrCreate({
                    where: {
                        Name: name,
                        Description: description,
                        Price: price,
                        ID_Account: idAccount
                    }
                });
                return r[0].ID;
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_ADD_SHOP\""));
            }
        },

        /**
         * Delete a product from the shop
         * @param {Number} idAccount ID of the account deleting the product
         * @param {Number} idProduct ID du product being deleted
         * @returns {Promise<void>}
         * @constructor
         */
        DeleteProduct: async(idAccount, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_DELETE_SHOP")) {
                await dataObject.Product.destroy({ where: { ID: idProduct } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_DELETE_SHOP\""));
            }
        },

        // TESTED

        /**
         * Get a dump of every product
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetAllProducts: async() => {
            return await dataObject.Product.findAll();
        },

        /**
         * Get the categories ID of the product
         * @param {Number} idProduct ID of the product
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetCategoriesID: async(idProduct) => {
            return await dataObject.Product_Category.findAll({ where: { ID_Product: idProduct } });
        },

        // TESTED

        /**
         * Return a category by its ID
         * @param {Number} idCategory ID of the category
         * @returns {Promise<Model>}
         * @constructor
         */
        GetCategorieFromID: async(idCategory) => {
            return await dataObject.Category.findOne({ where: { ID: idCategory } });
        },

        // TESTED

        /**
         * Return every product belonging to a specific category
         * @param {Number} idCategory ID of the category
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetProductsFromCategorieID: async(idCategory) => {
            return await dataObject.Product_Category.findAll({ where: { ID_Category: idCategory } });
        },

        // TESTED

        /**
         * Return a product by its ID
         * @param {Number} idProduct ID of the product
         * @returns {Promise<Model>}
         * @constructor
         */
        GetProductFromID: async(idProduct) => {
            return await dataObject.Product.findOne({ where: { ID: idProduct } });
        },

        // TESTED

        /**
         * Add a product to the user basket
         * @param {Number} idAccount ID of the user account
         * @param {Number} idProduct ID of the product
         * @param {Number} quantity Quantity of the product (Must be positive)
         * @returns {Promise<void>}
         * @constructor
         */
        AddItemToPurchaseList: async(idAccount, idProduct, quantity) => {
            if (await permissions.FilterPermission(idAccount, "P_PURCHASE_SHOP")) {
                let r = await dataObject.Purchase.findOrCreate({ where: { Done: false, ID_Account: idAccount } });
                let s = await dataObject.Basket.findOrCreate({
                    where: {
                        ID_Product: idProduct,
                        ID: idAccount,
                        ID_Purchase: r[0].ID
                    },
                    defaults: { Quantity: quantity }
                });
                if (!s[1]) await dataObject.Basket.update({ Quantity: (s[0].Quantity + quantity) }, {
                    where: {
                        ID: idAccount,
                        ID_Product: idProduct,
                        ID_Purchase: r[0].ID
                    }
                });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_PURCHASE_SHOP\""));
            }
        },

        // TESTED

        /**
         * Get the basket of an user
         * @param {Number} idAccount ID of the user account
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetPurchaseListOfUser: async(idAccount) => {
            let r = await dataObject.Purchase.findOne({ where: { ID_Account: idAccount, Done: false } });
            let s = await dataObject.Basket.findAll({ where: { ID_Purchase: r.ID } });
            var ret = [];
            for (var i = 0; i < s.length; i++) {
                var purchase = s[i];
                let p = await dataObject.Product.findOne({where: {ID: purchase.ID_Product}});
                ret.push({
                    Article: p,
                    Quantite: purchase.Quantity
                });
            }
            return ret;
        },

        // TESTED

        /**
         * Commit a purchase
         * @param {Number} idAccount ID of the account committing the purchase
         * @returns {Promise<void>}
         * @constructor
         */
        CommitPurchase: async(idAccount) => {
            await dataObject.Purchase.update({ Done: true }, { where: { ID_Account: idAccount } });
        },

        // TESTED

        /**
         * Remove a product from the basket of an user
         * @param {Number} idAccount ID of the user account
         * @param {Number} idProduct ID of the product
         * @param {Number} quantity Quantity of the product to remove
         * @returns {Promise<void>}
         * @constructor
         */
        RemoveItemFromPurchaseList: async(idAccount, idProduct, quantity) => {
            let r = await dataObject.Purchase.findOne({ where: { ID_Account: idAccount, Done: false } });
            let s = await dataObject.Basket.findOne({ where: { ID_Purchase: r.ID, ID_Product: idProduct } });
            if (s.Quantity > quantity) {
                await dataObject.Basket.update({ Quantity: s.Quantity - quantity }, {
                    where: {
                        ID: s.ID,
                        ID_Product: idProduct,
                        ID_Purchase: r[0].ID
                    }
                });
            } else if (s.Quantity === quantity) {
                await dataObject.Basket.destroy({ where: { ID: s.ID, ID_Product: idProduct } });
            } else {
                return Promise.reject(new Error("The user cannot remove more product than he has added"));
            }
        },

        // TESTED

        /**
         * Get the history of an user
         * @param {Number} idAccount ID of the user account
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetHistoryOfPurchase: async(idAccount) => {
            return await dataObject.Purchase.findAll({ where: { ID_Account: idAccount, Done: true } });
        },

        // TESTED

        /**
         * Create a category
         * @param {Number} idAccount ID of the account creating the category
         * @param {String} category Name of the category
         * @returns {Promise<Model>} The new category
         * @constructor
         */
        CreateCategory: async(idAccount, category) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                let r = await dataObject.Category.findOrCreate({ where: { Name: category } });
                return r[0];
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Delete a category
         * @param {Number} idAccount ID of the account deleting the category
         * @param {Number} idCategory ID of the category being deleted
         * @returns {Promise<void>}
         * @constructor
         */
        DeleteCategorie: async(idAccount, idCategory) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                await dataObject.Category.destroy({ where: { ID: idCategory } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        // TESTED

        /**
         * Add a product to a category
         * @param {Number} idAccount ID of the account wishing to add a product to a category
         * @param {Number} idCategory ID of the category
         * @param {Number} idProduct ID of the product
         * @returns {Promise<void>}
         * @constructor
         */
        AddItemToCategory: async(idAccount, idCategory, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                await dataObject.Product_Category.findOrCreate({ where: { ID_Product: idProduct, ID_Category: idCategory } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Remove a product from a category
         * @param {Number} idAccount ID of the account wishing to remove the product from the category
         * @param {Number} idCategory ID of the category
         * @param {Number} idProduct ID of the product
         * @returns {Promise<void>}
         * @constructor
         */
        RemoveItemFromCategory: async(idAccount, idCategory, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                await dataObject.Product_Category.destroy({ where: { ID_Product: idProduct, ID_Category: idCategory } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        // TESTED

        /**
         * Get every category
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetAllCategories: async() => {
            return await dataObject.Category.findAll();
        },

        // TESTED

        /**
         * Get a category by its name
         * @param {String} category Name of the category
         * @returns {Promise<Model>}
         * @constructor
         */
        GetCategoryFromName: async(category) => {
            return await dataObject.Category.findOne({ where: { Name: category } });
        },

        GetTopThree: async() => {
            var m = {};
            var keys = [];
            var allPurchases = await dataObject.Basket.findAll();
            for (var i = 0; i < allPurchases.length; i++) {
                var purchase = allPurchases[i];

                if (m[purchase.ID_Product.toString()] == 0 || m[purchase.ID_Product.toString()] == null) {
                    m[purchase.ID_Product.toString()] = purchase.Quantity;
                    keys.push(purchase.ID_Product.toString())
                } else {
                    m[purchase.ID_Product.toString()] += purchase.Quantity;
                }
            }
            var first = '0';
            var second = '0';
            var third = '0';
            for (var i = 0; i < keys.length; i++) {
                var productKey = keys[i];
                var quantity = m[productKey];
                var oldQuantity1 = m[first] || 0;
                var oldQuantity2 = m[second] || 0;
                var oldQuantity3 = m[third] || 0;

                if (quantity > oldQuantity1) {
                    third = second;
                    second = first;
                    first = productKey;
                } else if (quantity > oldQuantity2) {
                    third = second;
                    second = productKey;
                } else if (quantity > oldQuantity3) {
                    third = productKey;
                }
            }
            var ids = [parseInt(first), parseInt(second), parseInt(third)];
            for (var i = 0; i < ids.length; i++) {
                var element = ids[i];
                if(element==0){
                    ids[i]=1;
                }
            }
            var firstProduct = await here.GetProductFromID(ids[0]);
            var secondProduct = await here.GetProductFromID(ids[1]);
            var thirdProduct = await here.GetProductFromID(ids[2]);
            return [firstProduct, secondProduct, thirdProduct];
        }
    };

    return here;
};