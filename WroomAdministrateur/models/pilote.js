let db = require('../configDb');


/*
* Récupérer l'intégralité des lettres du nom des pilotes
* @return Un tableau qui contient les premières lettres du nom des pilotes
*/
module.exports.getPremiereLettreNom = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql="SELECT DISTINCT(SUBSTRING(PILNOM,1,1)) AS premiere_lettre FROM pilote ";
						sql+="ORDER BY premiere_lettre"; 
						console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/*
* Récupérer tous les noms et prénoms des pilotes selon la première lettre de leur nom
* @Param : Première lettre du nom des pilotes
* @Return un tableau qui contient les noms et prénoms des pilotes selon la lettre
*/
module.exports.getListePiloteParNom=function(lettre,callback){
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p2.PHOADRESSE FROM pilote p INNER JOIN photo p2 "; 
						sql+="WHERE p2.PHONUM=1 AND p.PILNUM=p2.PILNUM AND p.PILNOM LIKE '"+lettre+"%' ";
						sql+="ORDER BY p.PILNOM";
						console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/*
* @Param : id du pilote
* @Return les informations d'un pilote : nom,prénom,date naissance,poids,taille,description,nationalité,photo
*/
module.exports.getInformationsOfOnePilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p.PILDATENAIS,p.PILPOIDS,p.PILTAILLE,p.PILTEXTE,p.PILPOINTS,p2.PAYNAT,p2.PAYNUM,p3.PHOADRESSE FROM pilote p INNER JOIN pays p2 INNER JOIN photo p3 ";
			sql+="WHERE p.PAYNUM=p2.PAYNUM AND p.PILNUM=p3.PILNUM AND p3.PHONUM=1 AND p.PILNUM="+id;
			console.log(sql);
			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* @Param : id du pilote
* @Return les informations d'un pilote : nom,prénom,date naissance,poids,taille,description,nationalité,photo
*/
module.exports.getInformationsPilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p.PILDATENAIS,p.PILPOIDS,p.PILTAILLE,p.PILTEXTE,p.PILPOINTS,p2.PAYNAT,p2.PAYNUM FROM pilote p INNER JOIN pays p2 ";
			sql+="WHERE p.PAYNUM=p2.PAYNUM AND p.PILNUM="+id;
			console.log(sql);
			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* Récupérer toutes les photos d'un pilote
* @Param : id du pilote
* @Return liste des photos
*/
module.exports.getAllPhotosOfOnePilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT PILNUM,PHOSUJET,PHOCOMMENTAIRE,PHOADRESSE FROM photo ";
			sql+="WHERE PHONUM<>1 AND PILNUM="+id;
			console.log(sql);
			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* Récupérer toutes les sponsors d'un pilote
* @Param : id du pilote
* @Return liste des sponsors
*/
module.exports.getAllSponsorsOfOnePilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT s.SPONOM,s.SPOSECTACTIVITE FROM sponsor s INNER JOIN sponsorise s2 ";
			sql+="WHERE s.SPONUM=s2.SPONUM AND s2.PILNUM="+id;
			console.log(sql);
			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* Renseigne l'écurie d'un pilote
* @Param : id du pilote
* @Return l'écurie du pilote s'il en a un
*/
module.exports.getStableofOnePilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT e.ECUNUM,e.ECUNOM FROM ecurie e INNER JOIN pilote p ";
			sql+="WHERE e.ECUNUM=p.ECUNUM AND p.PILNUM="+id;
			console.log(sql);
			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* Récupérer tous les noms, prénoms et dates de naissance des pilotes
* @Param : Première lettre du nom des pilotes
* @Return un tableau qui contient les noms et prénoms des pilotes selon la lettre
*/
module.exports.getMenuPilote=function(callback){
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p.PILDATENAIS FROM pilote p "; 
						sql+="ORDER BY p.PILNOM";
						console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.ajouterPilote=function(values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO pilote (PAYNUM,PILNOM,PILPRENOM,PILDATENAIS,PILPIGISTE,PILPOINTS,PILPOIDS,PILTAILLE,PILTEXTE,ECUNUM) ";
			sql+="VALUES("+values.nationalite+",'"+values.nom+"','"+values.prenom+"','"+values.datenaissance+"',0,"+values.points+","+values.poids+","+values.taille+",'"+values.description+"',"+values.ecurie+")";
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.modifierPilote=function(num,values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE pilote SET PAYNUM="+values.nationalite+",PILNOM='"+values.nom+"',PILPRENOM='"+values.prenom+"',PILDATENAIS='"+values.datenaissance+"',PILPIGISTE=0,PILPOINTS="+values.points+",PILPOIDS="+values.poids+",PILTAILLE="+values.taille+",PILTEXTE='"+values.description+"',ECUNUM="+values.ecurie+" ";
			sql+="WHERE PILNUM="+num;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerPiloteTableEssais=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM essais WHERE PILNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}

module.exports.supprimerPiloteTableSponsorise=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM sponsorise WHERE PILNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}

module.exports.supprimerPiloteTablePhoto=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM photo WHERE PILNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}

module.exports.supprimerPiloteTableCourse=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM course WHERE PILNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}

module.exports.supprimerPiloteTablePilote=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM pilote WHERE PILNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}

