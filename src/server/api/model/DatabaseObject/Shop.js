module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Add a product to the shop
         * @param {Number} idAccount ID of the user account adding a product
         * @param {String} name Name of the product
         * @param {String} description Description of the product
         * @param {Number} price Price of the product
         * @returns {Promise<Number>} ID of the product
         * @constructor
         */
        AddProduct: async (idAccount, name, description, price) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_SHOP")) {
                var r = dataObject.Product.findOrCreate({ where: { Nom: name, Description: description, Prix: price, ID_Compte: idAccount } });
                return r[0].ID;
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_ADD_SHOP\""));
            }
        },

        /**
         * Delete a product from the shop
         * @param {Number} idAccount ID of the account deleting the product
         * @param {Number} idProduct ID du product being deleted
         * @returns {Promise<never>}
         * @constructor
         */
        DeleteProduct: async (idAccount, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_DELETE_SHOP")) {
                await dataObject.Product.destroy({ where: { ID: idProduct } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_DELETE_SHOP\""));
            }
        },

        /**
         * Get a dump of every product
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetAllProducts: async () => {
            return await dataObject.Product.findAll();
        },

        /**
         * Get the categories ID of the product
         * @param {Number} idProduct ID of the product
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetCategoriesID: async (idProduct) => {
            return await dataObject.Product_Category.findAll({ where: { ID: idProduct } });
        },

        /**
         * Return a category by its ID
         * @param {Number} idCategory ID of the category
         * @returns {Promise<Model>}
         * @constructor
         */
        GetCategorieFromID: async (idCategory) => {
            return await dataObject.Category.findOne({ where: { ID: idCategory } });
        },

        /**
         * Return every product belonging to a specific category
         * @param {Number} idCategory ID of the category
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetProductsFromCategorieID: async (idCategory) => {
            return await dataObject.Product_Category.findAll({ where: { ID_Categorie: idCategory } });
        },

        /**
         * Return a product by its ID
         * @param {Number} idProduct ID of the product
         * @returns {Promise<Model>}
         * @constructor
         */
        GetProductFromID: async (idProduct) => {
            return await dataObject.Product.findOne({ where: { ID: idProduct } });
        },

        /**
         * Add a product to the user basket
         * @param {Number} idAccount ID of the user account
         * @param {Number} idProduct ID of the product
         * @param {Number} quantity Quantity of the product (Must be positive)
         * @returns {Promise<never>}
         * @constructor
         */
        AddItemToPurchaseList: async (idAccount, idProduct, quantity) => {
            if (await permissions.FilterPermission(idAccount, "P_PURCHASE_SHOP")) {
                var r = await dataObject.Purchase.findOrCreate({ where: { Realise: false, ID_Compte: idAccount } });
                var s = await dataObject.Basket.findOrCreate({ where: { ID_Produit: idProduct, ID: idAccount, ID_Achat: r[0].ID }, defaults: { Quantite: quantity } });
                if (!s[1]) await dataObject.Basket.update({ Quantite: r[0].Quantite + quantity }, { where: { ID: idAccount, ID_Produit: idProduct } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_PURCHASE_SHOP\""));
            }
        },

        /**
         * Get the basket of an user
         * @param {Number} idAccount ID of the user account
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetPurchaseListOfUser: async (idAccount) => {
            var r = await dataObject.Purchase.findOne({ where: { ID_Compte: idAccount, Realise: false } });
            return await dataObject.Basket.findAll({ where: { ID: r.ID } });
        },

        /**
         * Commit a purchase
         * @param {Number} idAccount ID of the account committing the purchase
         * @returns {Promise<never>}
         * @constructor
         */
        CommitPurchase: async (idAccount) => {
            await dataObject.Purchase.update({ Realise: true }, { where: { ID_Compte: idAccount } });
        },

        /**
         * Remove a product from the basket of an user
         * @param {Number} idAccount ID of the user account
         * @param {Number} idProduct ID of the product
         * @param {Number} quantity Quantity of the product to remove
         * @returns {Promise<never>}
         * @constructor
         */
        RemoveItemFromPurchaseList: async (idAccount, idProduct, quantity) => {
            var r = await dataObject.Purchase.findOne({ where: { ID_Compte: idAccount, Realise: false } });
            var s = await dataObject.Basket.findOne({ where: { ID: r.ID, ID_Produit: idProduct } });
            if (s.Quantite > quantity) {
                await dataObject.Basket.update({ Quantite: s.Quantite - quantity }, { where: { ID: s.ID, ID_Produit: idProduct } });
            } else if (s.Quantite === quantity) {
                await dataObject.Basket.destroy({ where: { ID: s.ID, ID_Produit: idProduct } });
            } else {
                return Promise.reject(new Error("The user cannot remove more product than he has added"));
            }
        },

        /**
         * Get the history of an user
         * @param {Number} idAccount ID of the user account
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetHistoryOfPurchase: async (idAccount) => {
            return await dataObject.Purchase.findAll({ where: { ID_Compte: idAccount, Realise: true } });
        },

        /**
         * Create a category
         * @param {Number} idAccount ID of the account creating the category
         * @param {String} category Name of the category
         * @returns {Promise<Model>} The new category
         * @constructor
         */
        CreateCategory: async (idAccount, category) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r =  await dataObject.Category.findOrCreate({ where: { Nom: category } });
                return r[0];
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Delete a category
         * @param {Number} idAccount ID of the account deleting the category
         * @param {Number} idCategory ID of the category being deleted
         * @returns {Promise<never>}
         * @constructor
         */
        DeleteCategorie: async (idAccount, idCategory) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                await dataObject.Category.destroy({ where: { ID: idCategory } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Add a product to a category
         * @param {Number} idAccount ID of the account wishing to add a product to a category
         * @param {Number} idCategory ID of the category
         * @param {Number} idProduct ID of the product
         * @returns {Promise<never>}
         * @constructor
         */
        AddItemToCategory: async (idAccount, idCategory, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                await dataObject.Product_Category.findOrCreate({ where: { ID: idProduct, ID_Categorie: idCategory } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Remove a product from a category
         * @param {Number} idAccount ID of the account wishing to remove the product from the category
         * @param {Number} idCategory ID of the category
         * @param {Number} idProduct ID of the product
         * @returns {Promise<never>}
         * @constructor
         */
        RemoveItemFromCategory: async (idAccount, idCategory, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                await dataObject.Product_Category.destroy({ where: { ID: idProduct, ID_Categorie: idCategory } });
            } else {
                return Promise.reject(new Error("The user with the following ID : #" + idAccount + " does not have the following permission : \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Get every category
         * @returns {Promise<Array<Model>>}
         * @constructor
         */
        GetAllCategories: async () => {
            return await dataObject.Category.findAll();
        },

        /**
         * Get a category by its name
         * @param {String} category Name of the category
         * @returns {Promise<Model>}
         * @constructor
         */
        GetCategoryFromName: async (category) => {
            return await dataObject.Category.findOne({ where: { Nom: category } });
        }

    };

    return here;
};