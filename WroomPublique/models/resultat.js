/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL

            let sql ="SELECT g.GPNUM, g.GPNOM, p.PAYADRDRAP FROM grandprix g, circuit c, pays p WHERE g.CIRNUM = c.CIRNUM AND c.PAYNUM = p.PAYNUM ";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getGrandPrixParNum = function (num, callback) {
    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT c.GPNUM, c.PILNUM, c.TEMPSCOURSE, p.PILNOM FROM course c JOIN pilote p ON c.PILNUM=p.PILNUM WHERE GPNUM=" + num + " ORDER BY c.TEMPSCOURSE ASC";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPointsParPlace = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PTPLACE, PTNBPOINTSPLACE FROM points ORDER BY PTPLACE ASC";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getPilotesParNum = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PILNUM, PILNOM FROM pilote WHERE ECUNUM IS NOT NULL AND PILNUM NOT IN (SELECT PILNUM FROM course WHERE GPNUM=" + num + ") ORDER BY PILNOM ASC";
            //console.log (sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getDernierResultat = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "SELECT GPNUM, GPNOM, GPDATE, GPDATEMAJ FROM grandprix ORDER BY GPDATE DESC LIMIT 1" ;
            //console.log (sql);
            connexion.query(sql, callback);

            connexion.release();
        }
    });
};