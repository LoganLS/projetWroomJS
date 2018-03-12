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
						let sql="SELECT DISTINCT(SUBSTRING(pilnom,1,1)) AS premiere_lettre FROM pilote ";
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
						let sql="SELECT p.pilnum,p.pilnom,p.pilprenom,p2.phoadresse FROM pilote p INNER JOIN photo p2 "; 
						sql+="WHERE p2.phonum=1 AND p.pilnum=p2.pilnum AND p.pilnom LIKE '"+lettre+"%' ";
						sql+="ORDER BY p.pilnom";
						console.log(sql);
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
			let sql="SELECT p.pilnum,p.pilnom,p.pilprenom,p.pildatenais,p.pilpoids,p.piltaille,p.piltexte,p.pilpoints,p2.paynat,p2.paynum,p3.phoadresse FROM pilote p INNER JOIN pays p2 INNER JOIN photo p3 ";
			sql+="WHERE p.paynum=p2.paynum AND p.pilnum=p3.pilnum AND p3.phonum=1 AND p.pilnum="+id;
			console.log(sql);
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
			let sql="SELECT p.pilnum,p.pilnom,p.pilprenom,p.pildatenais,p.pilpoids,p.piltaille,p.piltexte,p.pilpoints,p2.paynat,p2.paynum FROM pilote p INNER JOIN pays p2 ";
			sql+="WHERE p.paynum=p2.paynum AND p.pilnum="+id;
			console.log(sql);
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
			let sql="SELECT phosujet,phocommentaire,phoadresse FROM photo ";
			sql+="WHERE phonum<>1 AND pilnum="+id;
			console.log(sql);
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
			let sql="SELECT s.sponom,s.sposectactivite FROM sponsor s INNER JOIN sponsorise s2 ";
			sql+="WHERE s.sponum=s2.sponum AND s2.pilnum="+id;
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
			let sql="SELECT e.ecunum,e.ecunom FROM ecurie e INNER JOIN pilote p ";
			sql+="WHERE e.ecunum=p.ecunum AND p.pilnum="+id;
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
						let sql="SELECT p.pilnum,p.pilnom,p.pilprenom,p.pildatenais FROM pilote p "; 
						sql+="ORDER BY p.pilnom";
						console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/*module.exports.ajouterPilote=function(numpays,nom,prenom,datenaiss,points,poids,taille,description,numecu,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO pilote (paynum,pilnom,pilprenom,pildatenais,pilpigiste,pilpoints,pilpoids,piltaille,piltexte,ecunum) ";
			sql+="VALUES("+numpays+","+nom+","+prenom+","+datenaiss+",0,"+points+","+poids+","+taille+","+description+","+numecu+")";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};*/

module.exports.ajouterPilote=function(values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO pilote (paynum,pilnom,pilprenom,pildatenais,pilpigiste,pilpoints,pilpoids,piltaille,piltexte,ecunum) ";
			sql+="VALUES("+values.nationalite+",'"+values.nom+"','"+values.prenom+"','"+values.datenaissance+"',0,"+values.points+","+values.poids+","+values.taille+",'"+values.description+"',"+values.ecurie+")";
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.modifierPilote=function(num,values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE pilote SET paynum="+values.nationalite+",pilnom='"+values.nom+"',pilprenom='"+values.prenom+"',pildatenais='"+values.datenaissance+"',pilpigiste=0,pilpoints="+values.points+",pilpoids="+values.poids+",piltaille="+values.taille+",piltexte='"+values.description+"',ecunum="+values.ecurie+" ";
			sql+="WHERE pilnum="+num;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.getAllNationalite=function(callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT paynum,paynat FROM pays ";
			sql+="ORDER BY paynat";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.getAllEcurie=function(callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT ecunum,ecunom FROM ecurie ";
			sql+="ORDER BY ecunom";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.supprimerPilote=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM essais WHERE pilnum="+num;
			sql+=" DELETE FROM sponsorise WHERE pilnum="+num;
			sql+=" DELETE FROM photo WHERE pilnum="+num;
			sql+=" DELETE FROM course WHERE pilnum="+num;
			sql+=" DELETE FROM pilote WHERE pilnum="+num;
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
}