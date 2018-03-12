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
/*
module.exports.getPiloteNumEcurie=function(num,callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT p.PILNOM, p.PILPRENOM, ph.PHOADRESSE FROM pilote p, photo ph WHERE p.PILNUM = ph.PILNUM AND ph.PHONUM=1 AND ECUNUM = " + num + " ";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getVoitureNumEcurie=function(num,callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT v.VOINOM, v.VOIADRESSEIMAGE, tv.TYPELIBELLE FROM voiture v, type_voiture tv WHERE v.TYPNUM = tv.TYPNUM AND v.ECUNUM = " + num + " ";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getInfosEcuries=function(num, callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT e.ECUNOM, e.ECUNOMDIR, e.ECUADRSIEGE, p.PAYNOM, fp.FPNOM, e.ECUADRESSEIMAGE FROM ecurie e, pays p, fourn_pneu fp WHERE" +
                " e.PAYNUM = p.PAYNUM AND e.FPNUM = fp.FPNUM AND e.ECUNUM = " + num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

*/