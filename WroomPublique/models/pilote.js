let db = require('../configDb');


/*
* R�cup�rer l'int�gralit� des lettres du nom des pilotes
* @return Un tableau qui contient les premi�res lettres du nom des pilotes
*/
module.exports.getPremiereLettreNom = function (callback) {
   // connection � la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requ�te SQL
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
* R�cup�rer tous les noms et pr�noms des pilotes selon la premi�re lettre de leur nom
* @Param : Premi�re lettre du nom des pilotes
* @Return un tableau qui contient les noms et pr�noms des pilotes selon la lettre
*/
module.exports.getListePiloteParNom=function(lettre,callback){
   // connection � la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requ�te SQL
						let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p2.PHOADRESSE FROM pilote p INNER JOIN photo p2 "; 
						sql+="WHERE p2.PHONUM=1 AND p.PILNUM=p2.PILNUM AND p.PILNOM LIKE '"+lettre+"%' ";
						sql+="ORDER BY p.PILNOM";

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/*
* @Param : id du pilote
* @Return les informations d'un pilote : nom,pr�nom,date naissance,poids,taille,description,nationalit�,photo
*/
module.exports.getInformationsOfOnePilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p.PILDATENAIS,p.PILPOIDS,p.PILTAILLE,p.PILTEXTE,p.PILPOINTS,p2.PAYNAT,p2.PAYNUM,p3.PHOADRESSE FROM pilote p INNER JOIN pays p2 INNER JOIN photo p3 ";
			sql+="WHERE p.PAYNUM=p2.PAYNUM AND p.PILNUM=p3.PILNUM AND p3.PHONUM=1 AND p.PILNUM="+id;

			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* @Param : id du pilote
* @Return les informations d'un pilote : nom,pr�nom,date naissance,poids,taille,description,nationalit�,photo
*/
module.exports.getInformationsPilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT p.PILNUM,p.PILNOM,p.PILPRENOM,p.PILDATENAIS,p.PILPOIDS,p.PILTAILLE,p.PILTEXTE,p.PILPOINTS,p2.PAYNAT,p2.PAYNUM FROM pilote p INNER JOIN pays p2 ";
			sql+="WHERE p.PAYNUM=p2.PAYNUM AND p.PILNUM="+id;

			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* R�cup�rer toutes les photos d'un pilote
* @Param : id du pilote
* @Return liste des photos
*/
module.exports.getAllPhotosOfOnePilote=function(id,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT PILNUM,PHOSUJET,PHOCOMMENTAIRE,PHOADRESSE FROM photo ";
			sql+="WHERE PHONUM<>1 AND PILNUM="+id;

			connexion.query(sql,callback);
			connexion.release();
		}
	});
};

/*
* R�cup�rer toutes les sponsors d'un pilote
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
* Renseigne l'�curie d'un pilote
* @Param : id du pilote
* @Return l'�curie du pilote s'il en a un
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
* R�cup�rer tous les noms, pr�noms et dates de naissance des pilotes
* @Param : Premi�re lettre du nom des pilotes
* @Return un tableau qui contient les noms et pr�noms des pilotes selon la lettre
*/
module.exports.getMenuPilote=function(callback){
   // connection � la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requ�te SQL
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

module.exports.supprimerPilote=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM essais WHERE PILNUM="+num;
			sql+=" DELETE FROM sponsorise WHERE PILNUM="+num;
			sql+=" DELETE FROM photo WHERE PILNUM="+num;
			sql+=" DELETE FROM course WHERE PILNUM="+num;
			sql+=" DELETE FROM pilote WHERE PILNUM="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}