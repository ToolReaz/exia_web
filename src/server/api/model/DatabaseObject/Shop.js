module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Ajoute un produit au shop
         * @param {number} idAccount ID du compte de la personne souhaitant effectuer l'action
         * @param {string} name Nom du produit à ajouter
         * @param {string} description Description du produit à créer
         * @param {number} price Prix du produit
         */
        AddProduct: async (idAccount, name, description, price) => {
            if (await permissions.FilterPermission(idAccount, "P_ADD_SHOP")) {
                var r = dataObject.Produit.findOrCreate({ where: { Nom: name, Description: description, Prix: price, ID_Compte: idAccount } });
                return r[0].ID;
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_ADD_SHOP\""));
            }
        },


        /**
         * Supprime un produit du shop
         * @param {number} idAccount ID du compte de la personne souhaitant effectuer l'action
         * @param {number} idProduct ID du produit à supprimer
         */
        DeleteProduct: async (idAccount, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_DELETE_SHOP")) {
                await dataObject.Produit.destroy({ where: { ID: idProduct } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_DELETE_SHOP\""));
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
         * @param {number} idProduct ID du produit
         */
        GetCategoriesID: async (idProduct) => {
            return await dataObject.Regroupe.findAll({ where: { ID: idProduct } });
        },

        /**
         * Retourne une catégorie à partir de son ID
         * @param {number} idCategorie ID de la catégorie
         */
        GetCategorieFromID: async (idCategorie) => {
            return await dataObject.Categorie.findOne({ where: { ID: idCategorie } });
        },

        /**
         * Retourne l'ensemble des produits appartenant à une catégorie
         * @param {number} idCategorie ID de la catégorie
         */
        GetProductsFromCategorieID: async (idCategorie) => {
            return await dataObject.Regroupe.findAll({ where: { ID_Categorie: idCategorie } });
        },

        /**
         * Retourne un produit à partir de son ID
         * @param {number} idProduct ID du produi
         * @returns {promise}
         */
        GetProductFromID: async (idProduct) => {
            return await dataObject.Produit.findOne({ where: { ID: idProduct } });
        },

        /**
         * Ajoute un produit au panier d'un utilisateur
         * @param {number} idAccount ID du compte de l'utilisateur
         * @param {number} idProduct ID du produit
         * @param {number} quantity Quantité de produit à ajouter au panier de l'utilisateur
         */
        AddItemToPurchaseList: async (idAccount, idProduct, quantity) => {
            if (await permissions.FilterPermission(idAccount, "P_PURCHASE_SHOP")) {
                var r = await dataObject.Achats.findOrCreate({ where: { Realise: false, ID_Compte: idAccount } });
                var s = await dataObject.Panier.findOrCreate({ where: { ID_Produit: idProduct, ID: idAccount, ID_Achat: r[0].ID }, defaults: { Quantite: quantity } });
                if (!s[1]) {
                    var t = await dataObject.Panier.update({ Quantite: r[0].Quantite + quantity }, { where: { ID: idAccount, ID_Produit: idProduct } });
                }
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_PURCHASE_SHOP\""));
            }
        },

        /**
         * Récupère le panier d'un utilisateur
         * @param {number} idAccount ID du compte de l'utilisateur
         */
        GetPurchaseListOfUser: async (idAccount) => {
            var r = await dataObject.Achats.findOne({ where: { ID_Compte: idAccount, Realise: false } });
            var s = await dataObject.Panier.findAll({ where: { ID: r.ID } });
            return s;
        },

        /**
         * Effectue les achats enregistrés dans le panier
         * @param {number} idAccount ID du compte de la personne qui effectue ses achats
         */
        CommitPurchase: async (idAccount) => {
            return await dataObject.Achats.update({ Realise: true }, { where: { ID_Compte: idAccount } });
        },

        /**
         * Supprime des produits du panier de l'utilisateur
         * @param {number} idAccount ID du compte de l'utilisateur
         * @param {number} idProduct ID du produit à supprimer
         * @param {number} quantity Quantité du produit à déduire
         */
        RemoveItemFromPurchaseList: async (idAccount, idProduct, quantity) => {
            var r = await dataObject.Achats.findOne({ where: { ID_Compte: idAccount, Realise: false } });
            var s = await dataObject.Panier.findOne({ where: { ID: r.ID, ID_Produit: idProduct } });
            if (s.Quantite > quantity) {
                var t = await dataObject.Panier.update({ Quantite: s.Quantite - quantity }, { where: { ID: s.ID, ID_Produit: idProduct } });
            } else if (s.Quantite == quantity) {
                var t = await dataObject.Panier.destroy({ where: { ID: s.ID, ID_Produit: idProduct } });
            } else {
                Promise.reject(new Error("L'utilisateur ne peut pas supprimer plus de produits qu'il n'en a commandé"));
            }
        },

        /**
         * Retourne l'historique des achats de l'utilisateur
         * @param {number} idAccount ID du compte de l'utilisateur
         * @returns {promise}
         */
        GetHistoryOfPurchase: async (idAccount) => {
            return await dataObject.Achats.findAll({ where: { ID_Compte: idAccount, Realise: true } });
        },

        /**
         * Crée une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {string} categorie Nom de la catégorie à créer
         */
        CreateCategorie: async (idAccount, categorie) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Categorie.findOrCreate({ where: { Nom: categorie } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Supprime une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {string} idCategorie ID de la catégorie à supprimer
         */
        DeleteCategorie: async (idAccount, idCategorie) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Categorie.destroy({ where: { ID: idCategorie } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Ajoute un produit à une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {number} idCategorie ID de la catégorie à laquelle ajouter le produit
         * @param {number} idProduct ID du produit
         */
        AddItemToCategorie: async (idAccount, idCategorie) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Regroupe.findOrCreate({ where: { ID: idProduct, ID_Categorie: idCategorie } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
            }
        },

        /**
         * Supprime un produit d'une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {number} idCategorie ID de la catégorie de laquelle supprimer le produit
         * @param {number} idProduct ID du produit
         */
        RemoveItemFromCategorie: async (idAccount, idCategorie, idProduct) => {
            if (await permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP")) {
                var r = await dataObject.Regroupe.destroy({ where: { ID: idProduct, ID_Categorie: idCategorie } });
            } else {
                Promise.reject(new Error("L'utilisateur #" + idAccount + " n'a pas la permission \"P_SET_CATEGORIE_SHOP\""));
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
         * @param {string} categorie Nom de la catégorie
         */
        GetCategorieFromName: async (categorie) => {
            return await dataObject.Categorie.findOne({ where: { Nom: categorie } });
        }

    };

    return here;
}