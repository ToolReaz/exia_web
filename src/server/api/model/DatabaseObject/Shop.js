module.exports = (dataObject, permissions) => {

    var here = {

        /**
         * Ajoute un produit au shop
         * @param {number} idAccount ID du compte de la personne souhaitant effectuer l'action
         * @param {string} name Nom du produit à ajouter
         * @param {string} description Description du produit à créer
         * @param {number} price Prix du produit
         */
        AddProduct: (idAccount, name, description, price) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_ADD_SHOP").then(()=>{
                    dataObject.Produit.findOrCreate({where: {Nom: name, Description: description, Prix: price, ID_Compte: idAccount}}).then(r=>{
                        resolve();
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        },

        /**
         * Supprime un produit du shop
         * @param {number} idAccount ID du compte de la personne souhaitant effectuer l'action
         * @param {number} idProduct ID du produit à supprimer
         */
        DeleteProduct: (idAccount, idProduct) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_DELETE_SHOP").then(()=>{
                    dataObject.Produit.destroy({where: {ID: idProduct}}).then(r=>{
                        resolve();
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        },

        /**
         * Récupère tous les produits en vente
         */
        GetAllProducts: () => {
            return dataObject.Produit.findAll();
        },

        /**
         * Récupère tous les IDs des catégories auxquelles le produit appartient
         * @param {number} idProduct ID du produit
         */
        GetCategoriesID: (idProduct) => {
            return dataObject.Regroupe.findAll({where: {ID: idProduct}});
        },

        /**
         * Retourne une catégorie à partir de son ID
         * @param {number} idCategorie ID de la catégorie
         */
        GetCategorieFromID: (idCategorie) => {
            return dataObject.Categorie.findOne({where: {ID: idCategorie}});
        },

        /**
         * Retourne l'ensemble des produits appartenant à une catégorie
         * @param {number} idCategorie ID de la catégorie
         */
        GetProductsFromCategorieID: (idCategorie) => {
            return dataObject.Regroupe.findAll({where: {ID_Categorie: idCategorie}});
        },

        /**
         * Retourne un produit à partir de son ID
         * @param {number} idProduct ID du produit
         */
        GetProductFromID: (idProduct) => {
            return dataObject.Produit.findOne({where: {ID: idProduct}});
        },

        /**
         * Ajoute un produit au panier d'un utilisateur
         * @param {number} idAccount ID du compte de l'utilisateur
         * @param {number} idProduct ID du produit
         * @param {number} quantity Quantité de produit à ajouter au panier de l'utilisateur
         */
        AddItemToPurchaseList: (idAccount, idProduct, quantity) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_PURCHASE_SHOP").then(()=>{
                    dataObject.Panier.findOrCreate({where: {ID: idAccount, ID_Produit: idProduct}, defaults: {Quantite: quantity}}).then(r=>{
                        if(!r[1]){
                            dataObject.Panier.update({Quantite: r[0].Quantite+quantity}, {where: {ID: idAccount, ID_Produit: idProduct}}).then(s=>{
                                resolve();
                            }).catch(err=>{if(err)reject(err);});
                        } else {
                            resolve();
                        }
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        },

        /**
         * Récupère le panier d'un utilisateur
         * @param {number} idAccount ID du compte de l'utilisateur
         */
        GetPurchaseListOfUser: (idAccount) => {
            return dataObject.findAll({where: {ID: idAccount}});
        },

        /**
         * Crée une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {string} categorie Nom de la catégorie à créer
         */
        CreateCategorie: (idAccount, categorie) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP").then(()=>{
                    dataObject.Categorie.findOrCreate({where: {Nom: categorie}}).then(r=>{
                        resolve();
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        },

        /**
         * Supprime une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {string} idCategorie ID de la catégorie à supprimer
         */
        DeleteCategorie: (idAccount, idCategorie) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP").then(()=>{
                    dataObject.Categorie.destroy({where: {ID: idCategorie}}).then(r=>{
                        resolve();
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        },

        /**
         * Ajoute un produit à une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {number} idCategorie ID de la catégorie à laquelle ajouter le produit
         * @param {number} idProduct ID du produit
         */
        AddItemToCategorie: (idAccount, idCategorie, idProduct) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP").then(()=>{
                    dataObject.Regroupe.findOrCreate({where: {ID: idProduct, ID_Categorie: idCategorie}}).then(r=>{
                        resolve();
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        },

        /**
         * Supprime un produit d'une catégorie
         * @param {number} idAccout ID du compte de l'utilisateur voulant effectuer l'action
         * @param {number} idCategorie ID de la catégorie de laquelle supprimer le produit
         * @param {number} idProduct ID du produit
         */
        RemoveItemFromCategorie: (idAccount, idCategorie, idProduct) => {
            return new Promise((resolve, reject)=>{
                permissions.FilterPermission(idAccount, "P_SET_CATEGORIE_SHOP").then(()=>{
                    dataObject.Regroupe.destroy({where: {ID: idProduct, ID_Categorie: idCategorie}}).then(r=>{
                        resolve();
                    }).catch(err=>{if(err)reject(err);});
                }).catch(err=>{if(err)reject(err);});
            });
        }

    };

    return here;
}