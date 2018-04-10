/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeGrandPrix = function (callback) {
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT GPNUM, CIRNUM, GPNOM, GPDATE, GPNBTOURS, GPDATEMAJ, GPCOMMENTAIRE FROM grandprix";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getGrandPrixParNum = function (callback) {
    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "SELECT GPNUM, c.PILNUM, TEMPSCOURSE, PILNOM FROM course c JOIN pilote p ON c.PILNUM=p.PILNUM WHERE GPNUM=" + num + " ORDER BY TEMPSCOURSE ASC";
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


module.exports.initialiserPointsPilotes = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "UPDATE pilote SET PILPOINTS=0 WHERE PILPOINTS IS NULL";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.initialiserPointsEcuries = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "UPDATE ecurie SET ECUPOINTS=0 WHERE ECUPOINTS IS NULL";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};