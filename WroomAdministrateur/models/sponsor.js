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

module.exports.ajouterSponsor=function(values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO sponsor (sponom,sposectactivite) ";
			sql+="VALUES("+values.nom+",'"+values.activite+"')";
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.modifierSponsor=function(num,values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE sponsor SET sponum="+values.nom+",sposectactivite='"+"' ";
			sql+="WHERE sponum="+num;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.ajouterFinance=function(numeroEcurie,numeroSponsor,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO finance (ecunum,sponum) ";
			sql+="VALUES("+numeroEcurie+",'"+numeroSponsor+"')";
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.modifierFinance=function(numeroSponsor,numeroEcurie,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE finance SET ecunum="+numeroEcurie+"' ";
			sql+="WHERE sponum="+numeroSponsor;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerSponsor=function(numeroSponsor,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM finance f WHERE f.sponum="+numeroSponsor;
			sql+=" DELETE FROM sponsorise sp WHERE sp.sponum="+numeroSponsor;
			sql+=" DELETE FROM sponsor s WHERE s.sponum="+numeroSponsor;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};