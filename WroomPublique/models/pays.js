let db = require('../configDb');

module.exports.getAllNationalite=function(callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="SELECT PAYNUM,PAYNAT FROM pays ";
			sql+="ORDER BY PAYNAT";
			console.log(sql);
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.getAllPays = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT PAYNUM, PAYNOM FROM pays ";
			sql+="ORDER BY PAYNOM";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

