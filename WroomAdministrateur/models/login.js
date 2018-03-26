let db = require('../configDb');
var crypto = require('crypto');

function sha1(data) {
     var generator = crypto.createHash('sha1');
     generator.update(data)  
     return generator.digest('hex') 
}

module.exports.getConnection = function (login,passwd,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql="SELECT LOGIN from login WHERE LOGIN='"+login+"' AND PASSWD='"+sha1(passwd)+"'";
						console.log(sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};