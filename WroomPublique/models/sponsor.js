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