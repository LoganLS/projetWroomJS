/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*/
let db = require('../configDb');
module.exports.getAllEcurie = function (callback) {
    //connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            //s'il n'y a pas d'erreur de connexion
            //execution de la requête SQL
            let sql = "SELECT ECUNUM, ECUNOMDIR, ECUNOM, ECUPOINTS FROM ecurie ORDER BY ECUNOM";
            //console.log (sql);
            connexion.query(sql, callback);
            //la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getAllFournisseurs = function (callback) {
    //connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            //s'il n'y a pas d'erreur de connexion
            //execution de la requête SQL
            let sql = "SELECT FPNUM, FPNOM FROM fourn_pneu ORDER BY FPNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);
            //la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.ajouterEcurie = function (values, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO ecurie (ECUNOM, ECUNOMDIR, ECUADRSIEGE, ECUPOINTS, PAYNUM, FPNUM, ECUADRESSEIMAGE) ";
            sql += "VALUES('"+values.nom+"','"+values.directeur+"','"+values.adresse+"',"+values.points+","+values.pays+","+values.fournisseur+",'"+values.image+"')";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getEcurieParNum = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ECUNUM, ECUNOM, ECUNOMDIR, ECUADRSIEGE, ECUPOINTS, PAYNUM, FPNUM, ECUADRESSEIMAGE FROM ecurie WHERE ECUNUM=" + num;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.modifierEcurie=function(num,values,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="UPDATE ecurie SET ECUNOM='"+values.nom+"',ECUPOINTS=" + values.points+", ECUNOMDIR='"+values.directeur+"', FPNUM="+values.fournisseur+",ECUADRSIEGE='"+values.adresse+"', ECUADRESSEIMAGE='"+values.adresseImage+"'";
            sql+="WHERE ECUNUM="+num;
            connexion.query(sql,callback)
            connexion.release();
        }
    });
};


module.exports.supprimerEcurieVoiture = function (num, callback) {
    //connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            //s'il n'y a pas d'erreur de connexion
            //execution de la requête SQL
            let sql = "DELETE FROM voiture WHERE ECUNUM=" + num;
            //console.log (sql);
            connexion.query(sql, callback);
            //la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.supprimerEcurieSponsor = function (num, callback) {
    //connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            //s'il n'y a pas d'erreur de connexion
            //execution de la requête SQL
            let sql = "DELETE FROM finance WHERE ECUNUM=" + num;
            //console.log (sql);
            connexion.query(sql, callback);
            //la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.supprimerEcuriePilote = function (num, callback) {
    //connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            //s'il n'y a pas d'erreur de connexion
            //execution de la requête SQL
            let sql = "UPDATE pilote SET ECUNUM=null WHERE ECUNUM=" + num;
            //console.log (sql);
            connexion.query(sql, callback);
            //la connexion retourne dans le pool
            connexion.release();
        }
    });
};
module.exports.supprimerEcurie = function (num, callback) {
    //connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            //s'il n'y a pas d'erreur de connexion
            //execution de la requête SQL
            let sql = "DELETE FROM ecurie WHERE ECUNUM=" + num;
            //console.log (sql);
            connexion.query(sql, callback);
            //la connexion retourne dans le pool
            connexion.release();
        }
    });
};