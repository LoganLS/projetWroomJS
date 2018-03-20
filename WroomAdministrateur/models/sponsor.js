let db = require('../configDb');

module.exports.getMenuSponsor=function(callback){
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql="SELECT SPONUM,SPONOM,SPOSECTACTIVITE FROM sponsor s "; 
						sql+="ORDER BY s.SPONOM";
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
			let sql ="SELECT SPONUM,SPONOM,SPOSECTACTIVITE FROM sponsor ";
			sql+="WHERE SPONUM="+num;
			console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getEcurieSponsor = function (num,callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT e.ECUNUM,ECUNOM FROM ecurie e INNER JOIN finance f ";
			sql+="ON e.ECUNUM=f.ECUNUM ";
			sql+="WHERE SPONUM="+num;
			console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.ajouterSponsor=function(values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO sponsor (SPONOM,SPOSECTACTIVITE) ";
			sql+="VALUES('"+values.nom+"','"+values.activite+"')";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.modifierSponsor=function(num,values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE sponsor SET SPONUM='"+values.nom+"', SPOSECTACTIVITE='"+values.activite+"' ";
			sql+="WHERE SPONUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.ajouterFinance=function(numeroEcurie,callback){
	/*db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO finance (ECUNUM,SPONUM) ";
			sql+="VALUES("+numeroEcurie+","+numeroSponsor+")";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});*/
};

module.exports.modifierFinance=function(numeroSponsor,numeroEcurie,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE finance SET ECUNUM="+numeroEcurie+" ";
			sql+="WHERE SPONUM="+numeroSponsor;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

/*module.exports.supprimerSponsor=function(numeroSponsor,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM finance f WHERE f.SPONUM="+numeroSponsor;
			sql+=" DELETE FROM sponsorise sp WHERE sp.SPONUM="+numeroSponsor;
			sql+=" DELETE FROM sponsor s WHERE s.SPONUM="+numeroSponsor;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};*/

module.exports.supprimerSponsorTableSponsor=function(numeroSponsor,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql=" DELETE FROM sponsor WHERE SPONUM="+numeroSponsor;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerSponsorTableFinance=function(numeroSponsor,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM finance WHERE SPONUM="+numeroSponsor;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerSponsorTableSponsorise=function(numeroSponsor,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql=" DELETE FROM sponsorise WHERE SPONUM="+numeroSponsor;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};
