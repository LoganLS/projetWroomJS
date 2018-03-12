let model = require('../models/login.js');
var async=require('async');
// //////////////////////// L I S T E R  E C U R I E S

module.exports.authentification = function(request, response){
    response.title = 'Authentification';
    model.getConnexion(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
	response.authentification = result;
	
        response.render('connexion', response);
    });
}

/*
login=>admin
passwd=>5c46a8ead628e900fdb5c4322ab7f1b3315ae005
if(login==result[0]["login"] && pwd==result[0]["passwd"]){
	
}else{
	
}*/