module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Ajoute un produit au shop
         * @param {Number} idAccount ID du compte de la personne souhaitant effectuer l'action
         * @param {String} name Nom du produit à ajouter
         * @param {String} description Description du produit à créer
         * @param {Number} price Prix du produit
         */
        AddProduct: async (idAccount, name, description, price) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_SHOP")) {
                var r = dataObject.Produit.findOrCreate({ where: { Nom: name, Description: description, Prix: price, ID_Compte: idAccount } });
                return r[0].ID;
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_ADD_SHOP\""));
            }
        },


        /**
         * Supprime un produit du shop
         * @param {Number} idAccount ID du compte de la personne souhaitant effectuer l'action
         * @param {Number} idProduct ID du produit à supprimer
         */
        DeleteProduct: async (idAccount, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_DELETE_SHOP")) {
                await dataObject.Produit.destroy({ where: { ID: idProduct } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_DELETE_SHOP\""));
            }
        },

        /**
         * Récupère tous les produits en vente
         */
        GetAllProducts: async () => {
            return await dataObject.Produit.findAll();
        },

        /**
         * Récupère tous les IDs des catégories auxquelles le produit appartient
         * @param {Number} idProduct ID du produit
         */
        GetCategoriesID: async (idProduct) => {
            return await dataObject.Regroupe.findAll({ where: { ID: idProduct } });
        },

        /**
         * Retourne une catégorie à partir de son ID
         * @param {Number} idCategorie ID de la catégorie
         */
        GetCategorieFromID: async (idCategorie) => {
            return await dataObject.Categorie.findOne({ where: { ID: idCategorie } });
        },

        /**
         * Retourne l'ensemble des produits appartenant à une catégorie
         * @param {Number} idCategorie ID de la catégorie
         */
        GetProductsFromCategorieID: async (idCategorie) => {
            return await dataObject.Regroupe.findAll({ where: { ID_Categorie: idCategorie } });
        },

        /**
         * Retourne un produit à partir de son ID
         * @param {Number} idProduct ID du produit
         */
        GetProductFromID: async (idProduct) => {
            return await dataObject.Produit.findOne({ where: { ID: idProduct } });
        },

        /**
         * Ajoute un produit au panier d'un utilisateur
         * @param {Number} idAccount ID du compte de l'utilisateur
         * @param {Number} idProduct ID du produit
         * @param {Number} quantity Quantité de produit à ajouter au panier de l'utilisateur
         */
        AddItemToPurchaseList: async (idAccount, idProduct, quantity) => {
            if (await permissions.FilterPermission(idAccount, "P_PURCHASE_SHOP")) {
                var r = await dataObject.Achats.findOrCreate({ where: { Realise: false, ID_Compte: idAccount } });
                var s = await dataObject.Panier.findOrCreate({ where: { ID_Produit: idProduct, ID: idAccount, ID_Achat: r[0].ID }, defaults: { Quantite: quantity } });
                if (!s[1]) var t = await dataObject.Panier.update({ Quantite: r[0].Quantite + quantity }, { where: { ID: idAccount, ID_Produit: idProduct } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_PURCHASE_SHOP\""));
            }
        },

        /**
         * Récupère le panier d'un utilisateur
         * @param {Number} idAccount ID du compte de l'utilisateur
         */
        GetPurchaseListOfUser: async (idAccount) => {
            var r = await dataObject.Achats.findOne({ where: { ID_Compte: idAccount, Realise: false } });
            return await dataObject.Panier.findAll({ where: { ID: r.ID } });
        },

        /**
         * Effectue les achats enregistrés dans le panier
         * @param {Number} idAccount ID du compte de la personne qui effectue ses achats
         */
        CommitPurchase: async (idAccount) => {
            return await dataObject.Achats.update({ Realise: true }, { where: { ID_Compte: idAccount } });
        },

        /**
         * Supprime des produits du panier de l'utilisateur
         * @param {Number} idAccount ID du compte de l'utilisateur
         * @param {Number} idProduct ID du produit à supprimer
         * @param {Number} quantity Quantité du produit à déduire
         */
        RemoveItemFromPurchaseList: async (idAccount, idProduct, quantity) => {
            var r = await dataObject.Achats.findOne({ where: { ID_Compte: idAccount, Realise: false } });
            var s = await dataObject.Panier.findOne({ where: { ID: r.ID, ID_Produit: idProduct } });
            if (s.Quantite > quantity) {
                var t = await dataObject.Panier.update({ Quantite: s.Quantite - quantity }, { where: { ID: s.ID, ID_Produit: idProduct } });
            } else if (s.Quantite == quantity) {
                var t = await dataObject.Panier.destroy({ where: { ID: s.ID, ID_Produit: idProduct } });
            } else {
                return Promise.reject(new Error("L'utilisateur ne peut pas supprimer plus de produits qu'il n'en a commandé"));
            }
        },

        /**
         * Retourne l'historique des achats de l'utilisateur
         * @param {Number} idAccount ID du compte de l'utilisateur
         */
        GetHistoryOfPurchase: async (idAccount) => {
            return await dataObject.Achats.findAll({ where: { ID_Compte: idAccount, Realise: true } });
        },

        /**
         * Crée une catégorie
         * @param {Number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {String} categorie Nom de la catégorie à créer
         */
        CreateCategorie: async (idAccount, categorie) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Categorie.findOrCreate({ where: { Nom: categorie } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Supprime une catégorie
         * @param {Number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {String} idCategorie ID de la catégorie à supprimer
         */
        DeleteCategorie: async (idAccount, idCategorie) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Categorie.destroy({ where: { ID: idCategorie } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Ajoute un produit à une catégorie
         * @param {Number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {Number} idCategorie ID de la catégorie à laquelle ajouter le produit
         * @param {Number} idProduct ID du produit
         */
        AddItemToCategorie: async (idAccount, idCategorie) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Regroupe.findOrCreate({ where: { ID: idProduct, ID_Categorie: idCategorie } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Supprime un produit d'une catégorie
         * @param {Number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {Number} idCategorie ID de la catégorie de laquelle supprimer le produit
         * @param {Number} idProduct ID du produit
         */
        RemoveItemFromCategorie: async (idAccount, idCategorie, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Regroupe.destroy({ where: { ID: idProduct, ID_Categorie: idCategorie } });
            } else {
                return Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Récupère toutes les catégories
         */
        GetAllCategories: async () => {
            return await dataObject.Categorie.findAll();
        },

        /**
         * Retourne une catégorie à partir de son nom
         * @param {String} categorie Nom de la catégorie
         */
        GetCategorieFromName: async (categorie) => {
            return await dataObject.Categorie.findOne({ where: { Nom: categorie } });
        }

    };

    return here;
}