/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité des circuits avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N° du circuit, le nom de la photo du drapeau du pays et le nom du circuit
*/
module.exports.getListeCircuit = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
        	let sql ="SELECT CIRNUM, PAYADRDRAP, CIRNOM FROM circuit c INNER JOIN pays p ";
			sql= sql + "ON p.PAYNUM=c.PAYNUM";
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getInfosCircuit = function (num,callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT CIRNUM,CIRNOM,CIRLONGUEUR, CIRNBSPECTATEURS, CIRADRESSEIMAGE,CIRTEXT,p.PAYNUM,PAYNOM FROM circuit c INNER JOIN pays p ";
			sql+= "ON p.PAYNUM=c.PAYNUM ";
			sql+="WHERE CIRNUM="+num;
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getMenuCircuit = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT CIRNUM,CIRNOM,CIRLONGUEUR,CIRNBSPECTATEURS FROM circuit ";
			sql+="ORDER BY CIRNOM";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.getAllPays = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT PAYNUM,PAYNOM FROM pays ";
			sql+="ORDER BY PAYNOM";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.ajouterCircuit=function(values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO circuit (PAYNUM,CIRNOM,CIRLONGUEUR,CIRNBSPECTATEURS,CIRADRESSEIMAGE,CIRTEXT) ";
			sql+="VALUES("+values.pays+",'"+values.nom+"',"+values.longueur+","+values.spectateur+",'"+values.adresseImage+"','"+values.description+"')";
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.modifierCircuit=function(num,values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE circuit SET PAYNUM="+values.pays+",CIRNOM='"+values.nom+"',CIRLONGUEUR="+values.longueur+",CIRNBSPECTATEURS="+values.spectateur+",CIRADRESSEIMAGE='"+values.adresseImage+"',CIRTEXT='"+values.description+"' ";
			sql+="WHERE CIRNUM="+num;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerCircuitTableCourse=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM course WHERE GPNUM IN (SELECT GPNUM FROM grandprix WHERE CIRNUM="+num+") ";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerCircuitTableEssais=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM essais WHERE GPNUM IN (SELECT GPNUM FROM grandprix WHERE CIRNUM="+num+") ";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerCircuitTableGrandprix=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM grandprix ";
			sql+="WHERE CIRNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerCircuitTableCircuit=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM circuit ";
			sql+="WHERE CIRNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};