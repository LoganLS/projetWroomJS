let model=require('../models/sponsor.js');
var async=require('async');

module.exports.menuSponsor = function(request, response){
	response.title = 'Menu des Sponsors';
    response.css="admin";
	model.getMenuSponsor(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.menuSponsor = result;	
        console.log(result);
        response.render('menuSponsors', response);
	});
 }