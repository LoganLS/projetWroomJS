let db = require('../configDb');

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