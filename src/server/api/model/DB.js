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

const Appartient =      require('./Models/Appartient')      (connection, sql);
const Categorie =       require('./Models/Categorie')       (connection, sql);
const Commente =        require('./Models/Commente')        (connection, sql);
const Comprend =        require('./Models/Comprend')        (connection, sql);
const Compte =          require('./Models/Compte')          (connection, sql);
const Compte_PayPal =   require('./Models/Compte_PayPal')   (connection, sql);
const Idee =            require('./Models/Idee')            (connection, sql);
const Likes =           require('./Models/Likes')           (connection, sql);
const Manifestation =   require('./Models/Manifestation')   (connection, sql);
const Panier =          require('./Models/Panier')          (connection, sql);
const Participe =       require('./Models/Participe')       (connection, sql);
const Permission =      require('./Models/Permission')      (connection, sql);
const Photographie =    require('./Models/Photographie')    (connection, sql);
const Photos =          require('./Models/Photos')          (connection, sql);
const Possede =         require('./Models/Possede')         (connection, sql);
const Produit =         require('./Models/Produit')         (connection, sql);
const Regroupe =        require('./Models/Regroupe')        (connection, sql);
const Role =            require('./Models/Role')            (connection, sql);
const Session =         require('./Models/Session')         (connection, sql);
const Vote =            require('./Models/Vote')            (connection, sql);

/**
 * Calcule un ET logique sur un tableau
 * @param {boolean[]} array Tableau de boolean dont il faut calculer le ET
 */
function AND(array) {
    var out = true;
    array.forEach(element => {
        out &= element;
    });
    return out;
}

/**
 * Détermine si deux membres de deux tableaux différents sont identiques
 * @param {array} arrayLeft Premier tableau
 * @param {array} arrayRight Deuxième tableau
 * @param {callback} transformLeft Transformée à appliquer au premier tableau
 * @param {callback} transformRight Transformée à appliquer au deuxième tableau
 */
function Contains(arrayLeft, arrayRight, transformLeft, transformRight) {
    var ret = false;
    arrayLeft.forEach(entityLeft => {
        var tLeft = transformLeft(entityLeft);
        arrayRight.forEach(entityRight => {
            var tRight = transformRight(entityRight);
            ret |= tRight == tLeft;
        });
    });
    return ret;
}

/**
 * Filtre les executions de requête en fonction des permissions
 * @param {int} userID ID de l'utilisateur executant la requête
 * @param {string} permission Permission requise pour executer la requête
 * @param {callback} callback Callback (param 1 : droits d'executer l'action)
 */
function FilterPermission(userID, permission, callback) {
    Permission.findOne({where: {Code_permission: permission}}).then(r=>{
        Possede.findAll({where: {ID: r.ID}}).then(s=>{
            Compte.findOne({where: {ID: userID}}).then(t=>{
                Appartient.findAll({where: {ID: t.ID}}).then(u=>{
                    callback(Contains(s, u, (s_)=>{return s_.ID_Role;}, (u_)=>{return u_.ID_Role}));
                });
            });
        });
    });
}

/**
 * Définit les permissions
 * @param {string} role Nom du role
 * @param {string} permission Nom de la permission
 * @param {callback} callback Callback après la mise en place des permissions
 */
function SetPermissions(role, permission, callback) {
    Role.findOrCreate({ where: { Nom_role: role } }).then(r => {
        Permission.findOrCreate({ where: { Code_permission: permission } }).then(s => {
            Possede.findOrCreate({ where: { ID: s[0].ID, ID_Role: r[0].ID } }).then(callback());
        });
    });
}

/**
 * Met les permissions de base
 */
function SetupPermissions() {

    SetPermissions("R_STUDENT"  , "P_CONNECT",          () => { });
    SetPermissions("R_STUDENT"  , "P_ADD_ACTIVITE",     () => { });
    SetPermissions("R_STUDENT"  , "P_LIST_ACTIVITE",    () => { });
    SetPermissions("R_STUDENT"  , "P_VOTE_IDEE",        () => { });
    SetPermissions("R_STUDENT"  , "P_ADD_PHOTO",        () => { });
    SetPermissions("R_STUDENT"  , "P_LIST_PHOTO",       () => { });
    SetPermissions("R_STUDENT"  , "P_LIKE_PHOTO",       () => { });
    SetPermissions("R_STUDENT"  , "P_COMMENT_PHOTO",    () => { });
    SetPermissions("R_STUDENT"  , "P_ADD_MANIF",        () => { });
    SetPermissions("R_STUDENT"  , "P_PARTICIPE_MANIF",  () => { });
    SetPermissions("R_BDE"      , "P_VALID_MANIF",      () => { });
    SetPermissions("R_BDE"      , "P_LISTE_INSCRITS",   () => { });
    SetPermissions("R_BDE"      , "P_COMMENT_LAST",     () => { });
    SetPermissions("R_BDE"      , "P_ADMIN_PHOTO",      () => { });
    SetPermissions("R_EXIA"     , "P_REPORT",           () => { });
    SetPermissions("R_EXIA"     , "P_DUMP_PHOTO",       () => { });
    SetPermissions("R_BDE"      , "P_ADD_SHOP",         () => { });
    SetPermissions("R_BDE"      , "P_DELETE_SHOP",      () => { });
    SetPermissions("R_STUDENT"  , "P_PURCHASE_SHOP",    () => { });

}

var DataBase = {};

/// DATA BASED OPERATIONS

/**
 * Crée un utilisateur et l'insère dans la base de données
 * @param {string} email Adresse E-Mail de l'utilisateur dont il faut créer le compte
 * @param {string} password Mot de passe (haché) de l'utilisateur dont il faut créer le compte
 * @param {string} firstname Prénom de l'utilisateur dont il faut créer le compte
 * @param {string} lastname Nom de l'utilisateur dont il faut créer le compte
 * @param {Callback} callback Callback selon si l'utilisateur existe (false) ou non (true)
 */
DataBase.CreateUser = (email, password, firstname, lastname, callback) => {
    Compte.findOrCreate({ where: { Adresse_Mail: email }, defaults: { Nom: lastname, Prenom: firstname, Mot_de_passe: password } }).then(r => {
        callback(r[1]); // r[1] si l'utilisateur n'existe pas, !r[1] si il existe
    });
};

/**
 * Récupère le compte (brut) d'une personne
 * @param {string} email Adresse E-Mail de la personne dont il faut récupérer le compte
 * @param {delegate} callback Callback dont le premier parametre est la réponse de la base de données
 */
DataBase.GetAccount = (email, callback) => {
    Compte.findOne({ where: { Adresse_Mail: email } }).then(r => {
        callback(r);
    });
};

/**
 * Crée une manifestation
 * @param {string} name Nom de la manifestation à créer
 * @param {string} description Description de la manifestation à créer
 * @param {string} imagePath Chemin de l'image associée à la manifestation
 * @param {Date} date Date de la première (ou seule) occurence de la manifestation
 * @param {int} interval_seconds Interval en secondes entre deux occurences de la manifestation (0 = pas de répétition)
 * @param {int} price Prix de participation à la manifestation
 */
DataBase.CreateManifestation = (name, description, imagePath, date, interval_seconds, price) => {
    return { Nom: name, Description: description, Chemin_Image: imagePath, Quand: date, Intervale: interval_seconds, Prix: price, Public: false };
};

DataBase.GetAllIdeas = (callback) => {
    Idee.findAll().then(r => { 
        callback(r); 
    });
};
/**
 * Récupère le nombre de like d'une image
 * @param {int} idPhoto ID de la photo dont il faut récupérer le nombre de like
 * @param {callback} callback Callback (1 param : entier représentant le nombre de like)
 */
DataBase.GetLikeCount = (idPhoto, callback) => {
    Likes.count({where: {ID_Photos: idPhoto}}).then(r=>{
        callback(r);
    })
}

/// TOKEN BASED OPERATIONS

/**
 * Retourne un compte à partir d'un token (penser à vérifier la validité du token avec GetTokenTime)
 * @param {string} token Token de connexion
 * @param {callback} callback Callback (param 1 : ID du compte)
 */
DataBase.GetAccountFromToken = (token, callback) => {
    Session.findOne({ where: { Token: token } }).then(r => {
        Compte.findOne({ where: { ID: r.ID } }).then(c => {
            callback(c.ID);
        });
    });
};

/**
 * Récupère le timestamp d'un token
 * @param {string} token Token dont il faut récupérer le temps
 * @param {callback} callback Callback (param 1 : timestamp du token)
 */
DataBase.GetTokenTime = (token, callback) => {
    Session.findOne({ where: { Token: token } }).then(r => {
        callback(r.Derniere_connexion);
    });
};
/**
 * Change le timestamp d'un token
 * @param {string} token Valeur du token
 * @param {Date} timestamp Nouveau timestamp
 * @param {callback} callback Callback (0 param)
 */
DataBase.SetTokenTimestamp = (token, timestamp, callback) => {
    Session.update({Derniere_connexion: timestamp}, {where: {Token: token}}).then(r=>{
        callback()
    });
};

/// ACCOUNT BASED OPERATIONS
// TODO : Retour d'erreur si non autorisé
/**
 * Crée une idée et l'insère dans la base de données
 * @param {int} idAccount ID du compte de la personne ayant crée l'idée à mettre dans la boite à idées obtenu par GetAccount
 * @param {string} title Titre de l'idée
 * @param {string} text Texte/Description de l'idée
 * @param {array} manifestationArray Liste de manifestation obtenue par CreateManifestation
 * @param {callback} callback Callback (aucun param) retourné une fois l'insertion dans la base de données terminée
 */
DataBase.CreateIdea = (idAccount, title, text, manifestationArray, callback) => {
    FilterPermission(idAccount, "P_ADD_ACTIVITE", (ok)=>{if(ok)CreateIdea(idAccount, title, text, manifestationArray, callback);});
};
function CreateIdea(idAccount, title, text, manifestationArray, callback){
    Idee.findOrCreate({ where: { Titre: title, Texte: text }, defaults: { Soumis_le: Date.now(), ID_Compte: idAccount, Approuve: false } }).then(r => {
        var idIdee = r[0].ID;
        var done = [].fill(false, 0, manifestationArray.length);
        for (let i = 0; i < manifestationArray.length; i++) {
            Manifestation.findOrCreate({ where: manifestationArray[i] }).then(s => {
                Comprend.findOrCreate({ where: { ID: r.ID, ID_Manifestation: s.ID } }).then(t => {
                    done[i] = true;
                    if (AND(done)) { callback(); }
                });
            });
        }
    });
}
/**
 * Crée un token pour un utilisateur
 * @param {int} idCompte ID du compte associé au token
 * @param {string} token Token à insérer pour l'utilisateur spécifié
 * @param {callback} callback Callback (1 param : True si le token n'existait pas, False si le token existait déjà)
 */
DataBase.SetToken = (idAccount, token, callback) => {
    FilterPermission(idAccount, "P_CONNECT", (ok)=>{if(ok)SetToken(idAccount, token, callback);});
};
function SetToken(idAccount, token, callback){
    Session.findOrCreate({ where: { Token: token }, defaults: { Derniere_connexion: Date.now(), ID_Compte: idAccount } }).then(r => {
        callback(r[1]);
    });
}
/**
 * Crée une liaison entre un compte PayPal et un compte sur le site du BDE
 * @param {int} idAccount ID du compte
 * @param {string} paypalApiKey Clé de l'API PayPal
 * @param {callback} callback Callback (true : succès, false : l'utilisateur n'existe pas)
 */
DataBase.SetPayPal = (idAccount, paypalApiKey, callback) => {
    Compte.findOne({ where: { ID: idAccount } }).then(r => {
        if (r) {
            Compte_PayPal.findOrCreate({ where: { GUID: paypalApiKey, ID_Compte: r.ID } }).then(s => {
                callback(true);
            });
        } else {
            callback(false);
        }
    })
};
/**
 * Vote pour une idée
 * @param {int} idAccount ID du compte ayant voté
 * @param {int} idIdea ID de l'idée votée
 * @param {boolean} vote Valeur du vote
 * @param {callback} callback Callback (pas de param)
 */
DataBase.VoteIdea = (idAccount, idIdea, vote, callback) => {
    FilterPermission(idAccount, "P_VOTE_IDEE", (ok)=>{if(ok)VoteIdeaid(Account, idIdea, vote, callback);});
};
/**
 * Vote pour une idée
 * @param {int} idAccount ID du compte ayant voté
 * @param {int} idIdea ID de l'idée votée
 * @param {boolean} vote Valeur du vote
 * @param {callback} callback Callback (pas de param)
 */
function VoteIdea(idAccount, idIdea, vote, callback){
    Vote.findOrCreate({where: {ID: idAccount, ID_Idee: idIdea}, defaults: {Pour: vote}});
}
/**
 * Inscrit une personne à une manif
 * @param {int} idAccount ID du compte voulant s'inscrire à une manif
 * @param {int} idManif ID de la manif
 * @param {callback} callback Callback (0 param)
 */
DataBase.InscrireManif = (idAccount, idManif, callback) => {
    FilterPermission(idAccount, "P_PARTICIPE_MANIF", (ok)=>{if(ok)InscrireManif(idAccount, idManif, callback);});
}
/**
 * Inscrit une personne à une manif
 * @param {int} idAccount ID du compte voulant s'inscrire à une manif
 * @param {int} idManif ID de la manif
 * @param {callback} callback Callback (0 param)
 */
function InscrireManif(idAccount, idManif, callback){
    Participe.findOrCreate({where: {ID: idAccount, ID_Manifestation: idManif}}).then(r=>{callback();});
}

/**
 * Récupère la clé de l'API de Paypal associée au compte
 * @param {int} idAccount ID du compte
 * @param {callback} callback Callback (param 1 : compte paypal)
 */
DataBase.GetPayPalFromAccount = (idAccount, callback) => {
    Compte_PayPal.findOne({ where: { ID_Compte: idAccount } }).then(r => {
        callback(r.GUID);
    });
};

/**
 * Récupère les données brutes liées au compte
 * @param {int} idAccount ID du compte
 * @param {callback} callback Callback (param 1 : compte)
 */
DataBase.GetAccountFromId = (idAccount, callback) => {
    Compte.findOne({ where: { ID: idAccount } }).then(r => {
        callback(r);
    });
};
/**
 * Ajoute une photo à une manif
 * @param {int} idAccount ID du compte souhaitant uploader l'image
 * @param {string} photoPath Path de l'image
 * @param {int} idManif ID de la manifestation
 * @param {callback} callback Callback (0 param)
 */
DataBase.AddPhoto = (idAccount, photoPath, idManif, callback) => {
    FilterPermission(idAccount, "P_ADD_PHOTO", (ok)=>{if(ok)AddPhoto(idAccount, photoPath, idManif, callback);});
};
/**
 * Ajoute une photo à une manif
 * @param {int} idAccount ID du compte souhaitant uploader l'image
 * @param {string} photoPath Path de l'image
 * @param {int} idManif ID de la manifestation
 * @param {callback} callback Callback (0 param)
 */
function AddPhoto(idAccount, photoPath, idManif, callback) {
    Photos.findOrCreate({ where: { Chemin_Image: photoPath }, defaults: { Public: false } }).then(r => {
        Photographie.findOrCreate({ where: { ID_Photos: r.ID, ID_Manifestation: idManif, ID: idAccount } }).then(s => {
            Participe.findOne({ where: { ID: idAccount, ID_Manifestation: idManif } }).then(t => {
                if (t) callback();
            });
        });
    });
}

/**
 * Commente une photo
 * @param {int} idAccount ID du compte
 * @param {int} idPhoto ID de la photo
 * @param {string} comment Commentaire pour la photo
 * @param {callback} callback Callback (0 param)
 */
DataBase.CommentPhoto = (idAccount, idPhoto, comment, callback) => {
    FilterPermission(idAccount, "P_COMMENT_PHOTO", (ok)=>{if(ok)CommentPhoto(idAccount, idPhoto, comment, callback);});
}
/**
 * Commente une photo
 * @param {int} idAccount ID du compte
 * @param {int} idPhoto ID de la photo
 * @param {string} comment Commentaire pour la photo
 * @param {callback} callback Callback (0 param)
 */
function CommentPhoto(idAccount, idPhoto, comment, callback){
    Comment.findOrCreate({where: {ID: idAccount, ID_Photos: idPhoto, Texte: comment}}).then(r=>{
        callback();
    });
}

DataBase.LikePhoto = (idAccount, idPhoto, like, callback) => {
    FilterPermission(idAccount, "P_LIKE_PHOTO", (ok)=>{if(ok)LikePhoto(idAccount, idPhoto, like, callback);});
}

function LikePhoto(idAccount, idPhoto, like, callback){
    if(like){
        likes.findOrCreate({where: {ID: idAccount, ID_Photos: idPhoto}}).then(r=>{
            callback();
        });
    } else {
        likes.destroy({where: {ID: idAccount, ID_Photos: idPhoto}}).then(r=>{
            callback();
        });
    }
}


connection.sync({ force: false, logging: false }).then(() => {

    SetupPermissions();

});

module.exports = DataBase;