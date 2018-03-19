let db = require('../configDb');

module.exports.getMenuSponsor=function(callback){
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql="SELECT sponum,sponom,sposectactivite FROM sponsor s "; 
						sql+="ORDER BY s.sponom";
						console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInfosSponsor = function (num,callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT sponum,sponom,sposectactivite FROM sponsor ";
			sql+="WHERE sponum="+num;
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getEcurieSponsor = function (num,callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT e.ecunum,ecunom FROM ecurie e INNER JOIN finance f ";
			sql+="ON e.ecunum=f.ecunum ";
			sql+="WHERE sponum="+num;
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};