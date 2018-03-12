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
        	let sql ="SELECT cirnum, payadrdrap, cirnom FROM circuit c INNER JOIN pays p ";
			sql= sql + "ON p.paynum=c.paynum";
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getInfosCircuit = function (num,callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT cirnom,cirlongueur, cirnbspectateurs, ciradresseimage,cirtext,p.paynum,paynom FROM circuit c INNER JOIN pays p ";
			sql+= "ON p.paynum=c.paynum ";
			sql+="WHERE cirnum="+num;
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getMenuCircuit = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT cirnum,cirnom,cirlongueur,cirnbspectateurs FROM circuit ";
			sql+="ORDER BY cirnom";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.getAllPays = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT paynum,paynom FROM pays ";
			sql+="ORDER BY paynom";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};