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
            let sql ="SELECT g.GPNOM, g.GPNUM, p.PAYADRDRAP FROM grandprix g, circuit c, pays p WHERE g.CIRNUM = c.CIRNUM AND c.PAYNUM = p.PAYNUM ";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getResultatGrandPrix=function(num,callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT p.PILNOM, p.PILPRENOM, c.TEMPSCOURSE FROM pilote p, course c WHERE p.PILNUM = c.PILNUM  AND c.GPNUM = " + num + " ORDER BY c.TEMPSCOURSE ASC";
            connexion.query(sql, callback);
            console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
