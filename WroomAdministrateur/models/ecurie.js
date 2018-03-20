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
module.exports.getListeEcurie = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ECUNUM, PAYADRDRAP, ECUNOM FROM ecurie e INNER JOIN pays p ";
            sql= sql + "ON p.PAYNUM=e.PAYNUM ORDER BY ecunom";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

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
            let sql="SELECT e.ECUNUM, e.ECUNOM, e.ECUNOMDIR, e.ECUADRSIEGE, e.ECUPOINTS, p.PAYNOM, fp.FPNOM, e.ECUADRESSEIMAGE FROM ecurie e, pays p, fourn_pneu fp WHERE" +
                " e.PAYNUM = p.PAYNUM AND e.FPNUM = fp.FPNUM AND e.ECUNUM = " + num;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getMenuEcurie=function(callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT e.ECUNUM, e.ECUNOM, e.ECUNOMDIR, e.ECUPOINTS  FROM ecurie e ORDER BY e.ECUNOM";
            console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getAllEcurie=function(callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT ECUNUM,ECUNOM FROM ecurie ";
			sql+="ORDER BY ECUNOM";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.ajouterEcurie=function(values,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO ecurie (ECUNOM, ECUNOMDIR, ECUADRSIEGE, ECUPOINTS, PAYNUM, ECUADRESSEIMAGE) ";
            sql+="VALUES("+values.nom+"',"+values.nomdir+","+values.adressesiege+",'"+values.nbpoints+"','"+values.pays+"','"+values.image+"')";
            connexion.query(sql,callback)
            connexion.release();
        }
    });
};

module.exports.modifierEcurie=function(num,values,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="UPDATE ecurie SET PAYNUM="+values.pays+",CIRNOM='"+values.nom+"',CIRLONGUEUR="+values.longueur+",CIRNBSPECTATEURS="+values.spectateur+",CIRADRESSEIMAGE='"+values.adresseImage+"',CIRTEXT='"+values.description+"' ";
            sql+="WHERE CIRNUM="+num;
            connexion.query(sql,callback)
            connexion.release();
        }
    });
};